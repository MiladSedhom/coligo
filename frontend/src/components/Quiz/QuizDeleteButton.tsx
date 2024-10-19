import { FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";
import { useAxios } from "hookverse";
import QuizType from "../../types/QuizType";

type Props = {
  id: QuizType["_id"];
  deleteQuiz: (_id: QuizType["_id"]) => void;
};

const QuizDeleteButton: React.FC<Props> = ({ id, deleteQuiz }) => {
  const {
    runAxios: runDeleteQuiz,
    loading: deleteLoading,
    error: deleteError,
  } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/quiz/${id}`,
    method: "DELETE",
  });

  useEffect(() => {
    if (!deleteError && !deleteLoading) {
      deleteQuiz(id);
    }
  }, [deleteError, deleteLoading, deleteQuiz, id]);

  return (
    <button onClick={runDeleteQuiz}>
      <FiTrash2 />
    </button>
  );
};

export default QuizDeleteButton;
