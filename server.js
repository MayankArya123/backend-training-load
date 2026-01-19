const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/auth.js");


dotenv.config();
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "https://frontend-training-load.vercel.app", // your Next.js frontend
    credentials: true,
  }),
);

app.use(express.json());

// 🔐 Protected route

app.use('/api/users',authMiddleware,userRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/workouts", authMiddleware, workoutRoutes);

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
