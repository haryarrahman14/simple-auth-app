import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Product } from "@/client/models/products";
import { useState } from "react";
import { useDeleteProduct } from "@/client/api/products";
import { useSnackBar } from "@/context/SnackbarProvider";

export const CardProductSkeleton: React.FC = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton width="100%" height="160px" />
        <Box sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
          <Skeleton width="40px" height="100%" />
          <Skeleton width="80%" height="100%" />
          <Skeleton width="100%" height="100%" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
        <Skeleton width="140px" height="100%" />
      </Box>
    </Box>
  );
};

export const CardProduct: React.FC<Product> = ({
  id,
  title,
  price,
  category,
  description,
  image,
}) => {
  const { mutate, isPending } = useDeleteProduct();
  const { snackbarShowMessage } = useSnackBar();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDeleteProduct = () => {
    mutate(`${id}`, {
      onSuccess: (response) => {
        if (response?.message === "OK") {
          snackbarShowMessage("Success to remove product", "info", 2000);
        } else {
          snackbarShowMessage("Failed to remove product", "error", 2000);
        }
        handleClose();
      },
      onError: () => {
        snackbarShowMessage("Failed to remove product", "error", 2000);
        handleClose();
      },
    });
  };

  return (
    <>
      <Card sx={{ width: "100%", border: "1px solid #090817" }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
              }}
            >
              ${price}
            </Typography>

            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                minHeight: "64px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                minHeight: "60px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button size="small" color="primary">
            📍 {category}
          </Button>

          <IconButton
            disabled={isPending}
            color="primary"
            aria-label="remove-product"
            onClick={handleClickOpen}
            sx={{ mr: 2 }}
          >
            {isPending ? <CircularProgress size="16px" /> : <DeleteIcon />}
          </IconButton>
        </CardActions>
      </Card>

      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning ⚠️</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure want to remove this product{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isPending} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant="contained"
            onClick={handleDeleteProduct}
            autoFocus
          >
            {isPending ? <CircularProgress size="16px" /> : "Remove"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
