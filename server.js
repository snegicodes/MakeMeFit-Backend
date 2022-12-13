require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts");

//Express app
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

mongoose.set("strictQuery", true);

//Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/workouts", workoutRoutes);

//DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listening to Request
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and Listening to port", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
