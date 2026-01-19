const { Router } = require("express");
const {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWeeklyInsights
} = require("../controllers/workout.controller");

const router = Router()
router.get("/", getWorkouts);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);
router.get("/insights/weekly", getWeeklyInsights);

module.exports = router
