import mongoose from "mongoose";

const LocalizedString = new mongoose.Schema(
  {
    en: { type: String, required: true },
    kn: { type: String, required: true },
  },
  { _id: false }
);

const ProgramSchema = new mongoose.Schema(
  {
    program_id: { type: String, unique: true },
    program_name: String,
    tagline: LocalizedString,
    settings: {
      serving_size_ml: Number,
      currency: String,
      recommended_time: LocalizedString,
    },
    meta: {
      created_at: Date,
      version: String,
      author: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Program", ProgramSchema);
