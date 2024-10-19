const express = require("express");
const router = express.Router();

const {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/QuizController");

router.get("/", getAllQuizzes);
router.post("/", createQuiz);
router.get("/:id", getQuiz);
router.patch("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

module.exports = router;
