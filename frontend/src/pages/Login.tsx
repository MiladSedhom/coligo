import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [t] = useTranslation();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login({ name, password }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          paddingX: "1.25rem",
          paddingY: "3rem",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "medium", textTransform: "capitalize" }}
        >
          {t("login")}
        </Typography>

        <form
          onSubmit={submitHandler}
          style={{
            marginTop: "2rem",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            width="220px"
          >
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              size="small"
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: "1.5rem" }}
          >
            {t("login")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
