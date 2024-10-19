import Stack from "@mui/material/Stack";
import QuizForm from "../components/Quiz/QuizForm";
import QuizzesList from "../components/Quiz/QuizzesList";
import { useAxios } from "hookverse";
import { useCallback, useEffect, useState } from "react";
import QuizType from "../types/QuizType";

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);

  const [quizzes, setQuizzes] = useState<QuizType[] | []>([]);

  const { data, runAxios, loading } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/quiz`,
  });

  useEffect(() => {
    runAxios();
  }, [runAxios]);

  useEffect(() => {
    if (data) setQuizzes(data.quizzes);
  }, [data]);

  const addQuiz = useCallback((newQuiz: QuizType) => {
    setQuizzes((prevQuizzes) => [newQuiz, ...prevQuizzes]);
  }, []);

  const deleteQuiz = useCallback((_id: QuizType["_id"]) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== _id));
  }, []);

  const updateQuiz = useCallback((updatedQuiz: QuizType) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz._id === updatedQuiz._id ? { ...quiz, ...updatedQuiz } : quiz
      )
    );
  }, []);

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
      <QuizzesList
        quizzes={quizzes}
        loading={loading}
        deleteQuiz={deleteQuiz}
        setSelectedQuiz={setSelectedQuiz}
      />
      <QuizForm
        addQuiz={addQuiz}
        updateQuiz={updateQuiz}
        selectedQuiz={selectedQuiz}
        setSelectedQuiz={setSelectedQuiz}
      />
    </Stack>
  );
};

export default Quizzes;
