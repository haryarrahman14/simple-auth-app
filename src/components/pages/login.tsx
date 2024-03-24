import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Login = () => {
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
      <Box
        component="form"
        autoComplete="false"
        sx={{
          width: "100%",
          maxWidth: "342px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "4px",
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
            marginBottom: "24px",
            fontWeight: "700",
          }}
        >
          Sign in to your Account 👋🏻
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <TextField fullWidth id="email" label="Email" size="small" />
          <TextField fullWidth id="password" label="Password" size="small" />
          <Button variant="contained">Sign In</Button>
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
    </Box>
  );
};

export default Login;
