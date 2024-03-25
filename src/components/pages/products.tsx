"use client";

import { useGetProducts } from "@/hooks/client/products";
import {
  CardProduct,
  CardProductSkeleton,
} from "@/components/shared/CardProduct";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import DropdownCategories from "@/components/shared/DropdownCategories";
import { Product } from "@/client/models/products";
import { useState } from "react";

const Products = () => {
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { isLoading, isFetching, data } = useGetProducts({
    category: category,
  });

  const products = data?.data?.slice((page - 1) * 6, page * 6);

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
          Products
        </Typography>

        <DropdownCategories onChange={setCategory} />
      </Box>

      <Grid
        container
        spacing="30px"
        sx={{
          marginBottom: "30px",
        }}
      >
        {isLoading || isFetching
          ? Array(6)
              .fill("")
              .map((_, idx) => (
                <Grid key={idx} item lg={4} md={6} xs={12}>
                  <CardProductSkeleton />
                </Grid>
              ))
          : products?.map((product: Product, index: number) => {
              return (
                <Grid key={index} item lg={4} md={6} xs={12}>
                  <CardProduct {...product} />
                </Grid>
              );
            })}
      </Grid>

      <Stack
        sx={{
          marginX: "auto",
        }}
      >
        <Pagination
          count={Math.ceil((data?.data?.length || 0) / 6)}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </Box>
  );
};

export default Products;
