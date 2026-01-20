require('dotenv').config(); // 🔥 must be first line

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth.js");


dotenv.config();
const app = express();

app.use(
  cors({
    origin:process.env.NEXT_URL, // frontend origin
    credentials: true, // must allow credentials
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workouts", auth, workoutRoutes);


app.get("/debug", (req, res) => {
  res.json({
    cookies: req.cookies,
    headers: req.headers.cookie || null,
  });
});

// Routes
app.get("/", (req, res) => {
  return res.json({ msg: "welcome to home" });
});
// Connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
