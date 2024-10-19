require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

// routers
const AnnouncementRouter = require("./routes/AnnouncementRoutes");
const quizRouter = require("./routes/QuizRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// json middleware
app.use(express.json());

// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/announcement", AnnouncementRouter);
app.use("/api/v1/quiz", quizRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
