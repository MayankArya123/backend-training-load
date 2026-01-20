const Workout = require("../models/workout");
const { z } = require("zod");
const { weeklyLoad, fatigueRisk, detectPlateau } = require("../utils/analytic");

const workoutSchema = z.object({
  title: z.string(),
  duration: z.number().positive(),
  intensity: z.number(),
  muscleGroup: z.string(),
  date: z.string(),
});

// Helper to get logged-in userId
const getUserId = (req) => {
  return req.userId;
};

const getWorkouts = async (req, res) => {
  console.log("req in workout", req.session);
  try {
    const userId = getUserId(req);
    const workouts = await Workout.find({ userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
};

const createWorkout = async (req, res) => {
  try {
    const userId = getUserId(req);
    console.log("create hitting", userId);
    const parsed = workoutSchema.parse(req.body);
    const workout = await Workout.create({
      userId,
      ...parsed,
      date: new Date(parsed.date),
    });
    res.status(201).json(workout);
  } catch (err) {
    console.log("error in create", err);
    res.status(400).json({ error: err.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    console.log("update wrokout hitting");
    const userId = getUserId(req);

    const parsed = workoutSchema.partial().parse(req.body);
    const updated = await Workout.findByIdAndUpdate(
      { _id: req.params.id, userId },
      parsed,
      {
        new: true,
      },
    );

    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.log("error in update workout", err);
    res.status(400).json({ error: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndDelete({
    _id: id,
    userId: getUserId(req),
  });

  if (!workout) return res.status(404).json({ error: "Workout not found" });
  res.json({ success: true });
};

const getWeeklyInsights = async (req, res) => {
  const userId = getUserId(req);
  const workouts = await Workout.find({ userId }).sort({ date: -1 });
  const loads = weeklyLoad(workouts);
  const weeks = Object.keys(loads);
  const current = loads[weeks[0]] || 0;
  const previous = loads[weeks[1]] || 0;

  const risk = fatigueRisk(current, previous);
  const plateau = detectPlateau(workouts);

  res.json({ current, previous, risk, plateau });
};

module.exports = {
  getWeeklyInsights,
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
