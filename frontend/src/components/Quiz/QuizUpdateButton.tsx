import { GoPencil } from "react-icons/go";
import QuizType from "../../types/QuizType";

type Props = {
  quiz: QuizType;
  setSelectedQuiz: React.Dispatch<React.SetStateAction<QuizType | null>>;
};

const QuizUpdateButton: React.FC<Props> = ({ quiz, setSelectedQuiz }) => {
  const clickHandler = () => {
    setSelectedQuiz(quiz);
  };

  return (
    <button onClick={clickHandler} style={{ marginLeft: "0.5rem" }}>
      <GoPencil />
    </button>
  );
};

export default QuizUpdateButton;
