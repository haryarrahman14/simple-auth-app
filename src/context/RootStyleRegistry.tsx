"use client";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

import local from "next/font/local";

const mona = local({
  src: [
    {
      path: "../../public/fonts/Mona-Sans.woff2",
    },
  ],
  variable: "--font-mona-sans",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#090817",
    },
    secondary: {
      main: "#3d3d4e",
    },
  },
  typography: {
    fontFamily: mona.style.fontFamily,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: "20px",
          },
          ".MuiFormLabel-root.Mui-focused": {
            fontSize: "14px",
            lineHeight: "24px",
          },
        },
      },
    },
  },
});

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "my" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
