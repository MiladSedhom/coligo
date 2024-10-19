const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: {
          type: [
            {
              optionText: {
                type: String,
                required: true,
              },
            },
          ],
          validate: {
            validator: (value) => {
              return value.length === 4;
            },
            message: "A question must have exactly 4 options.",
          },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
