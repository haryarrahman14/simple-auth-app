"use client";

import { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Slide from "@mui/material/Slide";
import type { AlertProps } from "@mui/material/Alert";

type Severity = AlertProps["severity"];

export type SnackbarShowMessage = (
  message: string,
  severity: Severity,
  duration: number
) => void;

type SnackBarContextActions = {
  snackbarShowMessage: SnackbarShowMessage;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("I'm a custom snackbar");
  const [duration, setDuration] = useState<number>(2000);
  const [severity, setSeverity] = useState<Severity>("success");

  const showMessage = (
    message: string,
    severity: Severity = "success",
    duration: number = 2000
  ) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ snackbarShowMessage: showMessage }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={duration}
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error("useSnackBar must be used within an SnackBarProvider");
  }

  return context;
};

export { SnackBarProvider, useSnackBar };
