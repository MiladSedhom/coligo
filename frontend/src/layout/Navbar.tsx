import Avatar from "../ui/UserAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [t] = useTranslation();

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Paper
      elevation={0}
      square
      sx={{
        padding: "1rem 2.5rem",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography
          variant="h5"
          component="span"
          sx={{
            fontWeight: "700",
            color: "rgb(107 114 128)",
            fontSize: "1.875rem",
          }}
        >
          <span>{t("welcomeUser")}</span>
          {" " + user},
        </Typography>
        <Avatar />
      </Stack>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "600",
          letterSpacing: "0.025em",
          display: { xs: "block", md: "none" },
          color: "rgb(107 114 128)",
        }}
      >
        Coligo
      </Typography>
    </Paper>
  );
};

export default Navbar;
