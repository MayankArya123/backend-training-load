const Workout = require("../models/workout.js")

function calculateVolume(workout) {
  return workout.duration * workout.intensity;
}

function weeklyLoad(workouts) {
  const weekly = {};

  workouts.forEach((w) => {
    const week = getWeekKey(new Date(w.date));
    weekly[week] = (weekly[week] || 0) + calculateVolume(w);
  });

  return weekly;
}

function fatigueRisk(current, previous) {
  if (!previous) return "normal";
  const diff = ((current - previous) / previous) * 100;

  if (diff > 20) return "high";
  if (diff > 10) return "medium";
  return "normal";
}

function detectPlateau(workouts) {
  const lastThree = workouts.slice(0, 3);
  if (lastThree.length < 3) return false;
  return lastThree.every((w) => w.intensity === lastThree[0].intensity);
}

function getWeekKey(date) {
  const year = date.getFullYear();
  const week = Math.ceil(
    ((+date - +new Date(year, 0, 1)) / 86400000 + 1) / 7
  );
  return `${year}-W${week}`;
}

module.exports = {calculateVolume,weeklyLoad,getWeekKey,detectPlateau,fatigueRisk}