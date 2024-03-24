"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import * as yup from "yup";
import { useFormik } from "formik";
import { usePostUsers } from "@/hooks/client/users";
import { useRouter } from "next/navigation";
import { useSnackBar } from "@/context/SnackbarProvider";
import Link from "next/link";

const validationSchema = yup.object({
  name: yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
  }),
  username: yup.string().required("Username is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Register = () => {
  const router = useRouter();
  const { mutate, isPending } = usePostUsers();
  const { snackbarShowMessage } = useSnackBar();

  const formik = useFormik({
    initialValues: {
      name: {
        firstname: "",
        lastname: "",
      },
      username: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (response: any) => {
          if (response?.message === "OK") {
            snackbarShowMessage("Register Success", "success", 3000);
            return router.push("/login");
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
          <Typography
            sx={{
              fontSize: "24px",
              marginBottom: "36px",
              fontWeight: "700",
            }}
          >
            Sign Up Account 📝
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
              }}
            >
              <TextField
                fullWidth
                id="name.firstname"
                label="First Name"
                size="small"
                sx={{
                  minHeight: "64px",
                }}
                value={formik.values.name.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name &&
                  formik.touched.name.firstname &&
                  formik.errors.name &&
                  Boolean(formik.errors.name.firstname)
                }
                helperText={
                  formik.touched.name &&
                  formik.touched.name.firstname &&
                  formik.errors.name &&
                  formik.errors.name.firstname
                }
              />
              <TextField
                fullWidth
                id="name.lastname"
                label="Last Name"
                size="small"
                sx={{
                  minHeight: "64px",
                }}
                value={formik.values.name.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name &&
                  formik.touched.name.lastname &&
                  formik.errors.name &&
                  Boolean(formik.errors.name.lastname)
                }
                helperText={
                  formik.touched.name &&
                  formik.touched.name.lastname &&
                  formik.errors.name &&
                  formik.errors.name.lastname
                }
              />
            </Box>
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
              id="email"
              label="Email"
              size="small"
              sx={{
                minHeight: "64px",
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="phone"
              label="Phone Number"
              size="small"
              sx={{
                minHeight: "64px",
              }}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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
              {isPending ? <CircularProgress size="16px" /> : "Sign Up"}
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
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#3d3d4e",
                textDecoration: "underline",
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
