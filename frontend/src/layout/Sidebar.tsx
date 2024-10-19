import sidebarLinks from "../data/sidebarLinks";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SidebarLink from "./SidebarLink";
import { IoMdExit } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const [t, i18n] = useTranslation();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Paper
      elevation={3}
      square
      sx={{
        minHeight: "100vh",
        width: { xs: "fit-content", md: "16rem" },
        backgroundImage: "linear-gradient(to bottom, #12567b, #398593)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box marginX="auto" paddingY="2.5rem">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "600",
            color: "white",
            letterSpacing: "0.025em",
            display: { xs: "none", md: "block" },
          }}
        >
          Coligo
        </Typography>
      </Box>
      <nav style={{ marginTop: "0.5rem" }}>
        <ul>
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.id} link={link} />
          ))}
          <li>
            <button
              onClick={logoutHandler}
              className="sidebar-link"
              style={{ width: "100%", background: "transparent" }}
            >
              <IoMdExit style={{ fontSize: "1.5rem" }} />
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                {t("logout")}
              </Box>
            </button>
          </li>
        </ul>
      </nav>
      <Box
        sx={{
          paddingX: { md: "2.5rem" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: { xs: "center", md: "left" },
        }}
      >
        <button
          onClick={() => i18n.changeLanguage("en")}
          style={{ color: "white", fontSize: "1rem" }}
        >
          {t("english")}
        </button>
        <button
          onClick={() => i18n.changeLanguage("ar")}
          style={{ color: "white", fontSize: "1rem" }}
        >
          {t("arabic")}
        </button>
      </Box>
    </Paper>
  );
};

export default Sidebar;
