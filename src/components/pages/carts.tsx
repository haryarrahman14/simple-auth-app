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
import CircularProgress from "@mui/material/CircularProgress";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useGetCarts, usePostCart } from "@/hooks/client/carts";
import React, { useState } from "react";
import { Cart } from "@/client/models/carts";
import { useGetUsersDetail } from "@/hooks/client/users";
import { CardProductQuantity } from "../shared/CardProductQuantity";

import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackBar } from "@/context/SnackbarProvider";
import { useGetProducts } from "@/hooks/client/products";
import DropdownProducts from "../shared/DropdownProducts";

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
  const [page, setPage] = useState<number>(0);
  const [dateRange, setDateRange] = React.useState<{
    startdate: Dayjs | null;
    enddate: Dayjs | null;
  }>({
    startdate: null,
    enddate: null,
  });

  const { data } = useGetCarts({
    startdate: dateRange?.startdate
      ? dayjs(dateRange?.startdate).format("YYYY-MM-DD")
      : "",
    enddate: dateRange?.enddate
      ? dayjs(dateRange?.enddate).format("YYYY-MM-DD")
      : "",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const [popUpProducts, setPopUpProducts] = useState<Cart["products"]>([]);

  const handleClickOpen = (products: Cart["products"]) => {
    setPopUpProducts(products);
  };

  const handleClose = () => {
    setPopUpProducts([]);
  };

  const carts = data?.data?.slice(page * 5, (page + 1) * 5);

  // ** CREATE CARTS **
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const router = useRouter();
  const { snackbarShowMessage } = useSnackBar();
  const { mutate, isPending } = usePostCart();

  const validationSchema = yup.object({
    products: yup
      .array()
      .of(
        yup.object().shape({
          productId: yup.number(),
          quantity: yup.number(),
        })
      )
      .compact((v) => !v.checked)
      .min(1, "Products should be of minimum 1 product"),
  });

  const formik = useFormik({
    initialValues: {
      products: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        userId: 1,
        date: dayjs().format("YYYY-MM-DDDD"),
      };

      mutate(body, {
        onSuccess: (response: any) => {
          if (response?.message === "OK") {
            snackbarShowMessage("Create Success", "success", 3000);
            return router.push("/");
          }

          snackbarShowMessage(response?.message, "error", 3000);
        },
      });
    },
  });

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              alignItems: "center",
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
            <Button
              variant="outlined"
              onClick={() => setOpenModalCreate(true)}
              sx={{
                textTransform: "capitalize",
              }}
            >
              Create New
            </Button>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <DatePicker
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () =>
                        setDateRange({
                          ...dateRange,
                          startdate: null,
                        }),
                    },
                  }}
                  label="Start Date"
                  value={dateRange.startdate}
                  onChange={(newValue) =>
                    setDateRange({
                      ...dateRange,
                      startdate: newValue,
                    })
                  }
                />

                <DatePicker
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () =>
                        setDateRange({
                          ...dateRange,
                          enddate: null,
                        }),
                    },
                  }}
                  label="End Date"
                  value={dateRange.enddate}
                  onChange={(newValue) =>
                    setDateRange({
                      ...dateRange,
                      enddate: newValue,
                    })
                  }
                />
              </Box>
            </DemoContainer>
          </LocalizationProvider>
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
                {carts?.map((cart: Cart, idx) => (
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
            count={data?.data?.length || 0}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
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
                <Grid key={idx} item lg={6} md={6} xs={12}>
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

      <Dialog
        open={openModalCreate}
        onClose={() => {
          setOpenModalCreate(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">📝 Create Cart</DialogTitle>
        <DialogContent>
          <form>
            <Box
              sx={{
                minWidth: "342px",
                minHegith: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <Box sx={{ paddingY: "16px" }}>
                <DropdownProducts
                  onChange={(values) => {
                    console.log({ values });
                  }}
                />
              </Box>
              <Button
                disabled={isPending}
                variant="contained"
                type="submit"
                sx={{
                  minHeight: "40px",
                  textTransform: "capitalize",
                }}
              >
                {isPending ? <CircularProgress size="16px" /> : "Create"}
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModalCreate(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Carts;
