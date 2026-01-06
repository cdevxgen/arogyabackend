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

const ImageConfigSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt_text: { type: String },
  },
  { _id: false }
);

const MaltSchema = new mongoose.Schema(
  {
    _id: String,
    type: String,

    name: LocalizedString,
    description: LocalizedString,
    ingredients: LocalizedArray,

    nutrition_facts: mongoose.Schema.Types.Mixed,
    benefits: LocalizedArray,

    image_config: ImageConfigSchema, // ✅ added image support

    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Malt", MaltSchema);
