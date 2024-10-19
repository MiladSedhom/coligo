import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SingleQuiz from "../Quiz/SingleQuiz";
import QuizType from "../../types/QuizType";
import { useTranslation } from "react-i18next";

type Props = {
  loading: boolean;
  quizzes: QuizType[];
  deleteQuiz: (_id: QuizType["_id"]) => void;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<QuizType | null>>;
};

const QuizzesList: React.FC<Props> = ({
  quizzes,
  loading,
  deleteQuiz,
  setSelectedQuiz,
}) => {
  const [t] = useTranslation();

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        paddingX: 5,
        paddingY: 3,
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Typography variant="h5" component="h3" sx={{ fontWeight: 500 }}>
        {t("quizzes")}
      </Typography>
      {!loading && quizzes ? (
        quizzes.map((quiz) => (
          <SingleQuiz
            key={quiz._id}
            quiz={quiz}
            deleteQuiz={deleteQuiz}
            setSelectedQuiz={setSelectedQuiz}
          />
        ))
      ) : (
        <p> {t("loading")}</p>
      )}
    </Paper>
  );
};

export default QuizzesList;
