import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import examsImage from "../assets/exams.svg";
import { useTranslation } from "react-i18next";

const ExamsTips = () => {
  const [t] = useTranslation();

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        gap: "5rem",
        overflow: "hidden",
      }}
    >
      <Box paddingX={5} paddingY={3} sx={{ order: { xs: 2, lg: 1 } }}>
        <Typography
          variant="h4"
          component="h2"
          className="gradient-text"
          sx={{ fontWeight: 700, textTransform: "uppercase" }}
        >
          {t("exams")}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="subtitle1" component="p">
            {t("examsDesc")}
          </Typography>
          <Typography variant="body2" component="p">
            {t("examsQuote")}
          </Typography>
          <Button
            variant="contained"
            sx={{ width: { xs: "100%", lg: "fit-content" } }}
          >
            {t("examsButtonText")}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          order: { xs: 1, lg: 2 },
          height: "13rem",
          display: { xs: "none", lg: "block" },
        }}
      >
        <img
          src={examsImage}
          style={{ transform: "scale(1.8)", height: "100%" }}
        />
      </Box>
    </Paper>
  );
};

export default ExamsTips;
