import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import QuizQuestion from "./QuizQuestion";
import Stack from "@mui/material/Stack";
import QuizDeleteButton from "./QuizDeleteButton";
import QuizUpdateButton from "./QuizUpdateButton";
import QuizType from "../../types/QuizType";

type Props = {
  quiz: QuizType;
  deleteQuiz: (_id: QuizType["_id"]) => void;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<QuizType | null>>;
};

const SingleQuiz: React.FC<Props> = ({ quiz, deleteQuiz, setSelectedQuiz }) => {
  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary
        expandIcon={<IoIosArrowDown />}
        aria-controls="panel2-content"
        id="panel2-header"
        sx={{ padding: 0 }}
      >
        {quiz.title}
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {quiz.questions.map((question) => (
            <QuizQuestion key={question._id} question={question} />
          ))}
        </Stack>
        <Stack direction="row" spacing={2} sx={{ marginTop: "1rem" }}>
          <QuizDeleteButton id={quiz._id} deleteQuiz={deleteQuiz} />
          <QuizUpdateButton quiz={quiz} setSelectedQuiz={setSelectedQuiz} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleQuiz;
