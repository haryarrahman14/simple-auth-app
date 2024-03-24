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

import { Product } from "@/client/models/products";
import { useState } from "react";

const TOTAL_PRODUCT = 20;
const MAXIMUM_PAGE = 4;

const Products = () => {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { isLoading, data } = useGetProducts({
    limit: TOTAL_PRODUCT,
  });

  const products = data?.data?.slice((page - 1) * 6, page * 6);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textTransform: "uppercase",
          marginBottom: "30px",
        }}
      >
        Products
      </Typography>

      <Grid
        container
        spacing="30px"
        sx={{
          marginBottom: "30px",
        }}
      >
        {isLoading
          ? Array(6)
              .fill("")
              .map((_, idx) => (
                <Grid key={idx} item lg={4}>
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
        <Pagination count={MAXIMUM_PAGE} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
};

export default Products;
