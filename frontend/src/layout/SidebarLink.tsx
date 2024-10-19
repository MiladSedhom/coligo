import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

type Props = {
  link: {
    icon: React.ReactNode;
    text: string;
    path: string;
  };
};

const SidebarLink: React.FC<Props> = ({ link }) => {
  const [t] = useTranslation();

  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => `sidebar-link ${isActive && "active"}`}
      >
        {link.icon}
        <Box sx={{ display: { xs: "none", md: "block" } }}>{t(link.text)}</Box>
      </NavLink>
    </li>
  );
};

export default SidebarLink;
