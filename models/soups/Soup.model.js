import mongoose from "mongoose";

const LocalizedString = new mongoose.Schema(
  {
    en: String,
    kn: String,
  },
  { _id: false }
);

const LocalizedArray = new mongoose.Schema(
  {
    en: [String],
    kn: [String],
  },
  { _id: false }
);

const SoupSchema = new mongoose.Schema(
  {
    _id: String,
    day_code: Number,
    day: LocalizedString,
    name: LocalizedString,
    description: LocalizedString,
    ingredients: LocalizedArray,
    nutrition_facts: {
      calories: Number,
      protein: String,
      carbs: String,
      fiber: String,
      fat: String,
    },
    preparation_steps: [
      {
        step: Number,
        en: String,
        kn: String,
      },
    ],
    health_tags: [String],
    benefits: LocalizedArray,
    image_config: {
      url: String,
      alt_text: String,
    },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Soup", SoupSchema);
