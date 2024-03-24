"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetCarts } from "@/hooks/client/carts";

const Carts = () => {
  useGetCarts({});
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Carts
        </Typography>

        {/* <DropdownCategories onChange={() => {}} /> */}
      </Box>
    </Box>
  );
};

export default Carts;
