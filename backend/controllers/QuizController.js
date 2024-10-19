const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Quiz = require("../models/Quiz");

const getAllQuizzes = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  const query = Quiz.find().sort({ createdAt: -1 });

  if (limit) {
    query.limit(limit);
  }

  const quizzes = await query.exec();

  res.status(StatusCodes.OK).json({ quizzes, count: quizzes.length });
};

const getQuiz = async (req, res) => {
  const quizId = req.params.id;

  const quiz = await Quiz.findOne({ _id: quizId });

  if (!quiz) throw new NotFoundError(`No quiz with id ${quizId}`);

  res.status(StatusCodes.OK).json({ quiz });
};

const createQuiz = async (req, res) => {
  const { title, questions } = req.body;

  const newQuiz = new Quiz({
    title,
    questions,
  });

  const savedQuiz = await newQuiz.save();

  res.status(StatusCodes.CREATED).json(savedQuiz);
};

const updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const { title, questions } = req.body;

  const updatedQuiz = await Quiz.findOneAndUpdate(
    { _id: quizId },
    { title, questions },
    { new: true, runValidators: true }
  );

  if (!updatedQuiz) throw new NotFoundError(`No quiz with id ${quizId}`);

  res.status(StatusCodes.OK).json(updatedQuiz);
};

const deleteQuiz = async (req, res) => {
  const quizId = req.params.id;

  const quiz = await Quiz.findOneAndRemove({
    _id: quizId,
  });

  if (!quiz) throw new NotFoundError(`No quiz with id ${quizId}`);

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
