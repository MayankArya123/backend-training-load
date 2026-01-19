const { Schema, model, models } =require("mongoose");

const WorkoutSchema = new Schema(
  { 
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // NEW: user-specific
    title: { type: String, required: true },
    duration: { type: Number, required: true }, // minutes
    intensity: { type: Number, min: 1, max: 10, required: true },
    muscleGroup: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = model("Workout", WorkoutSchema);
