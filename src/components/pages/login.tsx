"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress";

import * as yup from "yup";
import { useFormik } from "formik";
import { usePostLogin } from "@/hooks/client/login";
import { useRouter } from "next/navigation";
import { SnackbarShowMessage, withSnackbar } from "../HOC/SnackbarHOC";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = ({
  snackbarShowMessage,
}: {
  snackbarShowMessage: SnackbarShowMessage;
}) => {
  const router = useRouter();
  const { mutate, isPending } = usePostLogin();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (response: any) => {
          if (response?.data?.message === "OK") {
            snackbarShowMessage("Login Success", "success", 3000);
            return router.push("/");
          }

          snackbarShowMessage(response?.data?.message, "error", 3000);
        },
      });
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingX: "20px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: "342px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "12px",
              gap: "4px",
              cursor: "pointer",
              transition: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "150ms",
              ":hover": {
                gap: "8px",
              },
            }}
          >
            <KeyboardBackspaceIcon
              sx={{
                fontSize: "10px",
              }}
            />
            <Typography
              sx={{
                fontSize: "10px",
                color: "#0d0c22",
                fontWeight: "700",
              }}
            >
              Back to Home
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "24px",
              marginBottom: "36px",
              fontWeight: "700",
            }}
          >
            Sign in to your Account 👋🏻
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <TextField
              fullWidth
              id="username"
              label="Username"
              size="small"
              sx={{
                minHeight: "64px",
              }}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              size="small"
              sx={{
                minHeight: "64px",
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              disabled={isPending}
              variant="contained"
              type="submit"
              sx={{
                minHeight: "40px",
                textTransform: "capitalize",
              }}
            >
              {isPending ? <CircularProgress size="16px" /> : "Sign In"}
            </Button>
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              fontSize: "12px",
              color: "#3d3d4e",
              fontWeight: "500",
            }}
          >
            Don't have an account?{" "}
            <a
              href=""
              style={{
                color: "#3d3d4e",
                textDecoration: "underline",
              }}
            >
              Sign up
            </a>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default withSnackbar(Login);
