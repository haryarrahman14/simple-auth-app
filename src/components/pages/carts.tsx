"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Grid from "@mui/material/Grid";

import { useGetCarts } from "@/hooks/client/carts";
import React, { useMemo, useState } from "react";
import { Cart } from "@/client/models/carts";
import { useGetUsersDetail } from "@/hooks/client/users";
import dayjs from "dayjs";
import { CardProductQuantity } from "../shared/CardProductQuantity";

interface Column {
  id: "name" | "date" | "products";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}
const columns: readonly Column[] = [
  { id: "name", label: "Username", minWidth: 170, align: "center" },
  { id: "date", label: "Date", minWidth: 100, align: "center" },
  { id: "products", label: "Products", minWidth: 170, align: "center" },
];

const TableCellName: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const { isLoading, data } = useGetUsersDetail(userId);

  return (
    <TableCell
      style={{ minWidth: 170 }}
      align="center"
      sx={{
        color: "#090817",
      }}
    >
      {isLoading ? (
        <Skeleton width="100%" height="100%" />
      ) : data?.data?.username ? (
        data?.data?.username
      ) : (
        "-"
      )}
    </TableCell>
  );
};

const TableCellDate: React.FC<{
  date: string;
}> = ({ date }) => {
  return (
    <TableCell
      style={{ minWidth: 170 }}
      align="center"
      sx={{
        color: "#090817",
      }}
    >
      {date ? dayjs(date).format("YYYY-MM-DD") : "-"}
    </TableCell>
  );
};

const Carts = () => {
  const { data } = useGetCarts({});

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [popUpProducts, setPopUpProducts] = useState<Cart["products"]>([]);

  const handleClickOpen = (products: Cart["products"]) => {
    setPopUpProducts(products);
  };

  const handleClose = () => {
    setPopUpProducts([]);
  };

  return (
    <>
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

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((cart: Cart, idx) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`row-${idx}`}
                  >
                    <TableCellName userId={`${cart.userId}`} />
                    <TableCellDate date={cart?.date} />
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleClickOpen(cart.products)}
                        sx={{
                          minHeight: "40px",
                          textTransform: "capitalize",
                        }}
                      >
                        See Products
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Dialog
        open={popUpProducts?.length > 0}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">📝 All Products</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing="20px"
            sx={{
              marginBottom: "20px",
            }}
          >
            {popUpProducts?.map(
              (
                product: { productId: number; quantity: number },
                idx: number
              ) => (
                <Grid key={idx} item lg={4} md={6} xs={12}>
                  <CardProductQuantity
                    id={`${product.productId}`}
                    quantity={product.quantity}
                  />
                </Grid>
              )
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Carts;
