import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { QuizQuestionType } from "../../types/QuizType";

const Item = styled(Paper)(({ theme }) => ({
  display: "block",
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
}));

type Props = {
  question: QuizQuestionType;
};

const QuizQuestion: React.FC<Props> = ({ question }) => {
  return (
    <Stack direction="column" spacing={1}>
      <p>{question.questionText}</p>
      <Box
        sx={{
          marginTop: "1rem !important",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {question.options.map((option, optionIndex) => (
          <Item key={optionIndex}>{option.optionText}</Item>
        ))}
      </Box>
    </Stack>
  );
};

export default QuizQuestion;
