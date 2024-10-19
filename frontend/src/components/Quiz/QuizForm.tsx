import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAxios } from "hookverse";
import QuizType from "../../types/QuizType";
import { useTranslation } from "react-i18next";
import { OptionType } from "../../types/QuizType";

interface Question {
  questionText: string;
  options: OptionType[];
  [key: string]: string | OptionType[];
}

type Props = {
  selectedQuiz: QuizType | null;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<QuizType | null>>;
  addQuiz: (newAnnouncement: QuizType) => void;
  updateQuiz: (quiz: QuizType) => void;
};

const defaultQuestion = {
  _id: "q1",
  questionText: "",
  options: [
    { _id: "op1", optionText: "" },
    { _id: "op2", optionText: "" },
    { _id: "op3", optionText: "" },
    { _id: "op4", optionText: "" },
  ],
};

const QuizForm: React.FC<Props> = ({
  selectedQuiz,
  setSelectedQuiz,
  addQuiz,
  updateQuiz,
}) => {
  const [t] = useTranslation();

  const [quizTitle, setQuizTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([defaultQuestion]);

  useEffect(() => {
    setQuizTitle(selectedQuiz?.title || "");
    setQuestions(selectedQuiz?.questions || [defaultQuestion]);
  }, [selectedQuiz]);

  const handleQuestionChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][fieldName] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedQuestions[questionIndex].options.map((option, idx) =>
          idx === optionIndex ? { ...option, optionText: value } : option
        ),
      };
      return updatedQuestions;
    });
  };


  const handleAddQuestion = () => {
    const isCurrentQuestionEmpty =
      questions[questions.length - 1].questionText.trim() === "" ||
      questions[questions.length - 1].options.some(
        (option) => option.optionText.trim() === ""
      );

    if (quizTitle && !isCurrentQuestionEmpty) {
      setQuestions((prevQuestions) => {
        const newOptions = Array.from({ length: 4 }, (_, optionIndex) => ({
          _id: `op${prevQuestions.length + 1}-${optionIndex}`,
          optionText: "",
        }));

        return [
          ...prevQuestions,
          {
            _id: `q${prevQuestions.length + 1}`,
            questionText: "",
            options: newOptions,
          },
        ];
      });
    }
  };

  const { data: newQuiz, runAxios: createQuiz } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/quiz`,
    method: "POST",
    body: {
      title: quizTitle,
      questions: questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option) => ({
          optionText: option.optionText,
        })),
      })),
    },
  });

  useEffect(() => {
    if (newQuiz) {
      addQuiz(newQuiz);
    }
  }, [newQuiz, addQuiz]);

  const { data: updatedQuiz, runAxios: patchQuiz } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/quiz/${selectedQuiz?._id}`,
    method: "PATCH",
    body: {
      title: quizTitle,
      questions: questions.map((question) => ({
        questionText: question.questionText,
        options: question.options.map((option) => ({
          optionText: option.optionText,
        })),
      })),
    },
  });

  useEffect(() => {
    if (updatedQuiz) {
      updateQuiz(updatedQuiz);
    }
  }, [updatedQuiz, updateQuiz]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedQuiz) {
      await patchQuiz();
      setSelectedQuiz(null);
    } else {
      await createQuiz();
    }

    setQuizTitle("");
    setQuestions([defaultQuestion]);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        paddingX: "1.25rem",
        paddingY: "3rem",
        borderRadius: "10px",
        height: "fit-content",
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{ fontWeight: "medium", textTransform: "capitalize" }}
      >
        {selectedQuiz ? t("updateQuiz") : t("newQuiz")}
      </Typography>
      <form
        onSubmit={submitHandler}
        style={{
          marginTop: "1rem",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            id="Quiz Title"
            label="Quiz Title"
            variant="outlined"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            autoComplete="off"
            sx={{ flexGrow: 1, width: "250px" }}
          />
          {questions.map((question, questionIndex) => (
            <Box
              key={questionIndex}
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                id={`Question ${questionIndex + 1} Title`}
                label={`Question ${questionIndex + 1} Title`}
                variant="outlined"
                value={question.questionText}
                onChange={(e) =>
                  handleQuestionChange(
                    questionIndex,
                    "questionText",
                    e.target.value
                  )
                }
                autoComplete="off"
                size="small"
                sx={{ flexGrow: 1, width: "250px" }}
              />
              {question.options.map((option, optionIndex) => (
                <TextField
                  key={option._id}
                  id={option._id}
                  label={`Option ${optionIndex + 1}`}
                  variant="outlined"
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionChange(
                      questionIndex,
                      optionIndex,
                      e.target.value
                    )
                  }
                  autoComplete="off"
                  size="small"
                  sx={{ flexGrow: 1, width: "250px" }}
                />
              ))}
            </Box>
          ))}
          <Button variant="contained" onClick={handleAddQuestion} fullWidth>
            {t("addQuestion")}
          </Button>
          <Button variant="contained" type="submit" fullWidth>
            {t("submit")}
          </Button>
          {selectedQuiz && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => setSelectedQuiz(null)}
            >
              {t("cancel")}
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default QuizForm;
