import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your existing models
import Program from "../models/soups/Program.model.js";
import Soup from "../models/soups/Soup.model.js";
import Malt from "../models/soups/Malt.model.js";

dotenv.config();

// ==========================================
// 1. The Advanced Data
// ==========================================
const seedData = {
  program_details: {
    program_id: "prog_weekly_wellness_001",
    program_name: "Weekly Healthy Soups and Malts",
    tagline: {
      en: "Health is Wealth",
      kn: "ಆರೋಗ್ಯವೇ ಭಾಗ್ಯ",
    },
    settings: {
      serving_size_ml: 250,
      currency: "INR",
      recommended_time: {
        en: "Morning on empty stomach or evening 5 PM",
        kn: "ಬೆಳಿಗ್ಗೆ ಖಾಲಿ ಹೊಟ್ಟೆಯಲ್ಲಿ ಅಥವಾ ಸಂಜೆ 5 ಗಂಟೆಗೆ",
      },
    },
    meta: {
      created_at: "2024-01-06T10:00:00Z",
      version: "2.0",
      author: "Wellness Team",
    },
  },
  soups: [
    {
      _id: "soup_mon_veg",
      day_code: 1,
      day: { en: "Monday", kn: "ಸೋಮವಾರ" },
      name: {
        en: "Mixed Vegetable Detox Soup",
        kn: "ಮಿಶ್ರ ತರಕಾರಿಗಳ ಡಿಟಾಕ್ಸ್ ಸೂಪ್",
      },
      description: {
        en: "A light, fiber-rich soup made with seasonal vegetables to kickstart the week.",
        kn: "ವಾರದ ಆರಂಭಕ್ಕಾಗಿ ಋತುಮಾನದ ತರಕಾರಿಗಳಿಂದ ಮಾಡಿದ ಹಗುರವಾದ, ನಾರಿನಂಶವಿರುವ ಸೂಪ್.",
      },
      ingredients: {
        en: [
          "1 Carrot",
          "5 Beans",
          "1/4 Cabbage",
          "2 Tomatoes",
          "1/2 tsp Pepper",
          "Corainder leaves",
        ],
        kn: [
          "1 ಕ್ಯಾರೆಟ್",
          "5 ಬೀನ್ಸ್",
          "1/4 ಎಲೆಕೋಸು",
          "2 ಟೊಮ್ಯಾಟೊ",
          "1/2 ಚಮಚ ಮೆಣಸು",
          "ಕೊತ್ತಂಬರಿ ಸೊಪ್ಪು",
        ],
      },
      nutrition_facts: {
        calories: 85,
        protein: "3g",
        carbs: "12g",
        fiber: "6g",
        fat: "1g",
      },
      preparation_steps: [
        {
          step: 1,
          en: "Chop all vegetables finely.",
          kn: "ಎಲ್ಲಾ ತರಕಾರಿಗಳನ್ನು ಸಣ್ಣದಾಗಿ ಹೆಚ್ಚಿಕೊಳ್ಳಿ.",
        },
        {
          step: 2,
          en: "Boil water and add vegetables.",
          kn: "ನೀರನ್ನು ಕುದಿಸಿ ಮತ್ತು ತರಕಾರಿಗಳನ್ನು ಸೇರಿಸಿ.",
        },
        {
          step: 3,
          en: "Add pepper and salt, simmer for 15 mins.",
          kn: "ಮೆಣಸು ಮತ್ತು ಉಪ್ಪು ಸೇರಿಸಿ, 15 ನಿಮಿಷ ಕುದಿಸಿ.",
        },
        {
          step: 4,
          en: "Garnish with herbs and serve hot.",
          kn: "ಸೊಪ್ಪುಗಳಿಂದ ಅಲಂಕರಿಸಿ ಮತ್ತು ಬಿಸಿಯಾಗಿ ಬಡಿಸಿ.",
        },
      ],
      health_tags: ["Weight Loss", "High Fiber", "Vegan"],
      benefits: {
        en: ["Rich in vitamins", "Aids weight loss", "Improves digestion"],
        kn: [
          "ವಿಟಮಿನ್‌ಗಳಿಂದ ಸಮೃದ್ಧ",
          "ತೂಕ ಇಳಿಕೆಗೆ ಸಹಾಯಕ",
          "ಜೀರ್ಣಕ್ರಿಯೆ ಸುಧಾರಣೆ",
        ],
      },
      image_config: {
        url: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1767687844/soups1_yqjxn3.jpg",
        alt_text: "Bowl of mixed vegetable soup",
      },
      is_active: true,
    },
    {
      _id: "soup_tue_kashaya",
      day_code: 2,
      day: { en: "Tuesday", kn: "ಮಂಗಳವಾರ" },
      name: { en: "Purathana Immunity Kashaya", kn: "ಪುರಾತನ ರೋಗನಿರೋಧಕ ಕಷಾಯ" },
      description: {
        en: "An ancient herbal decoction to clear the throat and gut.",
        kn: "ಗಂಟಲು ಮತ್ತು ಕರುಳನ್ನು ಶುದ್ಧೀಕರಿಸುವ ಪುರಾತನ ಗಿಡಮೂಲಿಕೆ ಕಷಾಯ.",
      },
      ingredients: {
        en: [
          "1 inch Dry ginger",
          "1 tsp Pepper",
          "10 Tulsi leaves",
          "1 tsp Coriander seeds",
          "Jaggery (optional)",
        ],
        kn: [
          "1 ಇಂಚು ಒಣ ಶುಂಠಿ",
          "1 ಚಮಚ ಮೆಣಸು",
          "10 ತುಳಸಿ ಎಲೆಗಳು",
          "1 ಚಮಚ ಕೊತ್ತಂಬರಿ ಬೀಜ",
          "ಬೆಲ್ಲ (ಬೇಕಿದ್ದರೆ)",
        ],
      },
      nutrition_facts: {
        calories: 40,
        protein: "0.5g",
        carbs: "8g",
        fiber: "1g",
        fat: "0g",
      },
      preparation_steps: [
        {
          step: 1,
          en: "Crush ginger, pepper, and coriander seeds coarsely.",
          kn: "ಶುಂಠಿ, ಮೆಣಸು ಮತ್ತು ಕೊತ್ತಂಬರಿ ಬೀಜಗಳನ್ನು ಜಜ್ಜಿ.",
        },
        {
          step: 2,
          en: "Boil 2 glasses of water with these spices.",
          kn: "2 ಲೋಟ ನೀರಿನೊಂದಿಗೆ ಈ ಮಸಾಲೆಗಳನ್ನು ಕುದಿಸಿ.",
        },
        {
          step: 3,
          en: "Add Tulsi leaves and boil until water reduces to half.",
          kn: "ತುಳಸಿ ಎಲೆಗಳನ್ನು ಸೇರಿಸಿ ನೀರು ಅರ್ಧದಷ್ಟಾಗುವವರೆಗೆ ಕುದಿಸಿ.",
        },
        {
          step: 4,
          en: "Strain and drink warm.",
          kn: "ಸೋಸಿ ಬೆಚ್ಚಗಿರುವಾಗ ಕುಡಿಯಿರಿ.",
        },
      ],
      health_tags: ["Immunity Booster", "Flu Relief", "Detox"],
      benefits: {
        en: ["Relieves cold/cough", "Detoxifies body", "Soothes stomach"],
        kn: [
          "ಶೀತ/ಕೆಮ್ಮು ನಿವಾರಣೆ",
          "ದೇಹದ ವಿಷಾಂಶ ಹೊರಹಾಕುವಿಕೆ",
          "ಹೊಟ್ಟೆಗೆ ಹಿತಕಾರಿ",
        ],
      },
      image_config: {
        url: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1767687845/soups2_n3yk1g.jpg",
        alt_text: "Traditional herbal kashaya in clay cup",
      },
      is_active: true,
    },
    {
      _id: "soup_wed_banana",
      day_code: 3,
      day: { en: "Wednesday", kn: "ಬುಧವಾರ" },
      name: {
        en: "Banana Stem Kidney Cleanse",
        kn: "ಬಾಳೆದಿಂಡಿನ ಕಿಡ್ನಿ ಕ್ಲೆನ್ಸ್ ಸೂಪ್",
      },
      description: {
        en: "A powerful diuretic soup known for dissolving kidney stones.",
        kn: "ಕಿಡ್ನಿ ಕಲ್ಲುಗಳನ್ನು ಕರಗಿಸಲು ಹೆಸರುವಾಸಿಯಾದ ಶಕ್ತಿಯುತ ಸೂಪ್.",
      },
      ingredients: {
        en: [
          "1 cup Chopped Banana stem",
          "1/2 tsp Cumin",
          "Pinch of Turmeric",
          "Lemon juice",
          "Salt",
        ],
        kn: [
          "1 ಕಪ್ ಹೆಚ್ಚಿದ ಬಾಳೆದಿಂಡು",
          "1/2 ಚಮಚ ಜೀರಿಗೆ",
          "ಚಿಟಿಕೆ ಅರಿಶಿನ",
          "ನಿಂಬೆ ರಸ",
          "ಉಪ್ಪು",
        ],
      },
      nutrition_facts: {
        calories: 55,
        protein: "1g",
        carbs: "10g",
        fiber: "8g",
        fat: "0.5g",
      },
      preparation_steps: [
        {
          step: 1,
          en: "Remove outer layers and chop banana stem, removing fibers.",
          kn: "ಹೊರಗಿನ ಪದರಗಳನ್ನು ತೆಗೆದು, ನಾರುಗಳನ್ನು ತೆಗೆಯುತ್ತಾ ಬಾಳೆದಿಂಡನ್ನು ಹೆಚ್ಚಿಕೊಳ್ಳಿ.",
        },
        {
          step: 2,
          en: "Pressure cook with water, turmeric, and cumin for 2 whistles.",
          kn: "ನೀರು, ಅರಿಶಿನ ಮತ್ತು ಜೀರಿಗೆಯೊಂದಿಗೆ ಕುಕ್ಕರ್‌ನಲ್ಲಿ 2 ಸೀಟಿ ಕೂಗಿಸಿ.",
        },
        {
          step: 3,
          en: "Blend slightly if thick soup is preferred.",
          kn: "ದಪ್ಪ ಸೂಪ್ ಬೇಕಿದ್ದರೆ ಸ್ವಲ್ಪ ರುಬ್ಬಿಕೊಳ್ಳಿ.",
        },
        {
          step: 4,
          en: "Add lemon juice before serving.",
          kn: "ಬಡಿಸುವ ಮುನ್ನ ನಿಂಬೆ ರಸ ಸೇರಿಸಿ.",
        },
      ],
      health_tags: ["Kidney Health", "Diuretic", "Alkaline"],
      benefits: {
        en: ["Prevents kidney stones", "Reduces acidity", "High fiber content"],
        kn: [
          "ಕಿಡ್ನಿ ಕಲ್ಲು ತಡೆಗಟ್ಟುವಿಕೆ",
          "ಆಸಿಡಿಟಿ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ",
          "ಹೆಚ್ಚಿನ ನಾರಿನಂಶ",
        ],
      },
      image_config: {
        url: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1767687844/soups3_yijj1a.jpg",
        alt_text: "White banana stem juice in glass",
      },
      is_active: true,
    },
    {
      _id: "soup_thu_drumstick",
      day_code: 4,
      day: { en: "Thursday", kn: "ಗುರುವಾರ" },
      name: {
        en: "Iron-Rich Drumstick Leaf Soup",
        kn: "ಕಬ್ಬಿಣಾಂಶಯುಕ್ತ ನುಗ್ಗೆ ಸೊಪ್ಪಿನ ಸೂಪ್",
      },
      description: {
        en: "A superfood soup packed with iron, calcium, and essential vitamins.",
        kn: "ಕಬ್ಬಿಣ, ಕ್ಯಾಲ್ಸಿಯಂ ಮತ್ತು ಅಗತ್ಯ ವಿಟಮಿನ್‌ಗಳಿಂದ ತುಂಬಿರುವ ಸೂಪರ್‌ಫುಡ್ ಸೂಪ್.",
      },
      ingredients: {
        en: [
          "1 cup Drumstick leaves",
          "1 tsp Ghee",
          "4 Garlic cloves",
          "1 tsp Cumin",
          "Onion",
        ],
        kn: [
          "1 ಕಪ್ ನುಗ್ಗೆ ಸೊಪ್ಪು",
          "1 ಚಮಚ ತುಪ್ಪ",
          "4 ಎಸಳು ಬೆಳ್ಳುಳ್ಳಿ",
          "1 ಚಮಚ ಜೀರಿಗೆ",
          "ಈರುಳ್ಳಿ",
        ],
      },
      nutrition_facts: {
        calories: 110,
        protein: "5g",
        carbs: "8g",
        fiber: "4g",
        fat: "6g",
      },
      preparation_steps: [
        {
          step: 1,
          en: "Wash leaves thoroughly.",
          kn: "ಸೊಪ್ಪನ್ನು ಚೆನ್ನಾಗಿ ತೊಳೆಯಿರಿ.",
        },
        {
          step: 2,
          en: "Sauté garlic and onion in ghee.",
          kn: "ತುಪ್ಪದಲ್ಲಿ ಬೆಳ್ಳುಳ್ಳಿ ಮತ್ತು ಈರುಳ್ಳಿಯನ್ನು ಹುರಿಯಿರಿ.",
        },
        {
          step: 3,
          en: "Add leaves and water, boil for 10 minutes.",
          kn: "ಸೊಪ್ಪು ಮತ್ತು ನೀರು ಸೇರಿಸಿ 10 ನಿಮಿಷ ಕುದಿಸಿ.",
        },
        {
          step: 4,
          en: "Mash the leaves into the water and strain (optional).",
          kn: "ಸೊಪ್ಪನ್ನು ನೀರಿನಲ್ಲಿ ಕಿವುಚಿ ಮತ್ತು ಸೋಸಿ (ಬೇಕಿದ್ದರೆ).",
        },
      ],
      health_tags: ["Bone Health", "Diabetes Control", "Pregnancy Care"],
      benefits: {
        en: ["Strengthens bones", "Boosts hemoglobin", "Controls sugar levels"],
        kn: [
          "ಮೂಳೆಗಳನ್ನು ಬಲಪಡಿಸುತ್ತದೆ",
          "ಹಿಮೋಗ್ಲೋಬಿನ್ ಹೆಚ್ಚಿಸುತ್ತದೆ",
          "ಸಕ್ಕರೆ ಮಟ್ಟ ನಿಯಂತ್ರಣ",
        ],
      },
      image_config: {
        url: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1767687845/soups4_isurdi.jpg",
        alt_text: "Green drumstick leaf soup",
      },
      is_active: true,
    },
    {
      _id: "soup_fri_barley",
      day_code: 5,
      day: { en: "Friday", kn: "ಶುಕ್ರವಾರ" },
      name: { en: "Heart-Healthy Barley Malt", kn: "ಹೃದಯ ಸ್ನೇಹಿ ಬಾರ್ಲಿ ಗಂಜಿ" },
      description: {
        en: "A cooling soup that helps regulate cholesterol and body heat.",
        kn: "ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮತ್ತು ದೇಹದ ಉಷ್ಣತೆಯನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಹಾಯ ಮಾಡುವ ತಂಪಾದ ಸೂಪ್.",
      },
      ingredients: {
        en: [
          "2 tbsp Barley seeds",
          "3 cups Water",
          "Salt",
          "Buttermilk (optional)",
        ],
        kn: ["2 ಚಮಚ ಬಾರ್ಲಿ ಬೀಜ", "3 ಕಪ್ ನೀರು", "ಉಪ್ಪು", "ಮಜ್ಜಿಗೆ (ಬೇಕಿದ್ದರೆ)"],
      },
      nutrition_facts: {
        calories: 90,
        protein: "3g",
        carbs: "20g",
        fiber: "4g",
        fat: "0.5g",
      },
      preparation_steps: [
        {
          step: 1,
          en: "Soak barley seeds for 4 hours.",
          kn: "ಬಾರ್ಲಿ ಬೀಜಗಳನ್ನು 4 ಗಂಟೆಗಳ ಕಾಲ ನೆನೆಸಿ.",
        },
        {
          step: 2,
          en: "Pressure cook with 3 cups water for 3-4 whistles.",
          kn: "3 ಕಪ್ ನೀರಿನೊಂದಿಗೆ 3-4 ಸೀಟಿ ಕೂಗಿಸಿ.",
        },
        {
          step: 3,
          en: "Drink the water (add buttermilk if preferred).",
          kn: "ನೀರನ್ನು ಕುಡಿಯಿರಿ (ಇಷ್ಟವಿದ್ದರೆ ಮಜ್ಜಿಗೆ ಸೇರಿಸಿ).",
        },
      ],
      health_tags: ["Heart Health", "Coolant", "Weight Management"],
      benefits: {
        en: ["Lowers cholesterol", "Reduces body heat", "Controls appetite"],
        kn: [
          "ಕೊಲೆಸ್ಟ್ರಾಲ್ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ",
          "ದೇಹದ ಉಷ್ಣತೆ ತಗ್ಗಿಸುತ್ತದೆ",
          "ಹಸಿವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ",
        ],
      },
      image_config: {
        url: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1767687845/soups5_tgvuwm.jpg",
        alt_text: "Clear barley soup in bowl",
      },
      is_active: true,
    },
    {
      _id: "soup_sat_greens",
      day_code: 6,
      day: { en: "Saturday", kn: "ಶನಿವಾರ" },
      name: { en: "Pancha-Pathre Greens Soup", kn: "ಪಂಚ-ಪತ್ರೆ ಸೊಪ್ಪುಗಳ ಸೂಪ್" },
      description: {
        en: "A potent mix of 5 local greens for maximum mineral absorption.",
        kn: "ಗರಿಷ್ಠ ಖನಿಜಾಂಶಗಳಿಗಾಗಿ 5 ಸ್ಥಳೀಯ ಸೊಪ್ಪುಗಳ ಶಕ್ತಿಯುತ ಮಿಶ್ರಣ.",
      },
      ingredients: {
        en: [
          "Spinach",
          "Amaranth (Harive)",
          "Dill leaves",
          "Methi",
          "Curry leaves",
        ],
        kn: ["ಪಾಲಕ್", "ಹರಿವೆ ಸೊಪ್ಪು", "ಸಬ್ಬಕ್ಕಿ", "ಮೆಂತ್ಯ", "ಕರಿಬೇವು"],
      },
      nutrition_facts: {
        calories: 75,
        protein: "4g",
        carbs: "10g",
        fiber: "8g",
        fat: "1g",
      },
      preparation_steps: [
        {
          step: 1,
          en: "Clean and chop all greens.",
          kn: "ಎಲ್ಲಾ ಸೊಪ್ಪುಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ ಮತ್ತು ಹೆಚ್ಚಿಕೊಳ್ಳಿ.",
        },
        {
          step: 2,
          en: "Boil with water, onion, and a pinch of turmeric.",
          kn: "ನೀರು, ಈರುಳ್ಳಿ ಮತ್ತು ಚಿಟಿಕೆ ಅರಿಶಿನದೊಂದಿಗೆ ಕುದಿಸಿ.",
        },
        {
          step: 3,
          en: "Season with cumin and pepper.",
          kn: "ಜೀರಿಗೆ ಮತ್ತು ಮೆಣಸಿನೊಂದಿಗೆ ಒಗ್ಗರಣೆ ನೀಡಿ.",
        },
      ],
      health_tags: ["Anemia", "High Fiber", "Eye Health"],
      benefits: {
        en: ["Cures anemia", "Improves eyesight", "Cleanses colon"],
        kn: [
          "ರಕ್ತಹೀನತೆ ನಿವಾರಿಸುತ್ತದೆ",
          "ದೃಷ್ಟಿ ಸುಧಾರಿಸುತ್ತದೆ",
          "ಕರುಳನ್ನು ಶುದ್ಧೀಕರಿಸುತ್ತದೆ",
        ],
      },
      image_config: {
        url: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1767687846/soups7_yeole7.jpg",
        alt_text: "Dark green vegetable soup",
      },
      is_active: true,
    },
    {
      _id: "soup_sun_tomato",
      day_code: 7,
      day: { en: "Sunday", kn: "ಭಾನುವಾರ" },
      name: {
        en: "Roasted Tomato Pepper Soup",
        kn: "ಸುಟ್ಟ ಟೊಮ್ಯಾಟೊ ಮೆಣಸು ಸೂಪ್",
      },
      description: {
        en: "A tangy, spicy soup rich in lycopene for skin and heart health.",
        kn: "ಚರ್ಮ ಮತ್ತು ಹೃದಯದ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಲೈಕೋಪೀನ್ ಸಮೃದ್ಧವಾಗಿರುವ ಹುಳಿ, ಖಾರವಾದ ಸೂಪ್.",
      },
      ingredients: {
        en: [
          "3 Ripe Tomatoes",
          "1 tsp Black Pepper",
          "5 Garlic cloves",
          "1 Bay leaf",
        ],
        kn: [
          "3 ಹಣ್ಣಾದ ಟೊಮ್ಯಾಟೊ",
          "1 ಚಮಚ ಕಾಳು ಮೆಣಸು",
          "5 ಎಸಳು ಬೆಳ್ಳುಳ್ಳಿ",
          "1 ಪಲಾವ್ ಎಲೆ",
        ],
      },
      nutrition_facts: {
        calories: 60,
        protein: "2g",
        carbs: "9g",
        fiber: "3g",
        fat: "2g",
      },
      preparation_steps: [
        {
          step: 1,
          en: "Roast tomatoes and garlic slightly.",
          kn: "ಟೊಮ್ಯಾಟೊ ಮತ್ತು ಬೆಳ್ಳುಳ್ಳಿಯನ್ನು ಸ್ವಲ್ಪ ಸುಟ್ಟುಕೊಳ್ಳಿ.",
        },
        {
          step: 2,
          en: "Peel tomato skin and blend into a puree.",
          kn: "ಟೊಮ್ಯಾಟೊ ಸಿಪ್ಪೆ ತೆಗೆದು ಪ್ಯೂರಿ ಮಾಡಿ.",
        },
        {
          step: 3,
          en: "Boil puree with water, pepper powder, and salt.",
          kn: "ಪ್ಯೂರಿಯನ್ನು ನೀರು, ಮೆಣಸು ಪುಡಿ ಮತ್ತು ಉಪ್ಪಿನೊಂದಿಗೆ ಕುದಿಸಿ.",
        },
      ],
      health_tags: ["Skin Glow", "Antioxidant", "Digestion"],
      benefits: {
        en: ["Glowing skin", "Boosts metabolism", "Fights inflammation"],
        kn: ["ಚರ್ಮದ ಕಾಂತಿ", "ಚಯಾಪಚಯ ಕ್ರಿಯೆ ಹೆಚ್ಚಳ", "ಉರಿಯೂತ ನಿವಾರಣೆ"],
      },
      image_config: {
        url: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1767687846/soups6_zzrlgp.jpg",
        alt_text: "Red tomato soup with black pepper",
      },
      is_active: true,
    },
  ],
  malts: [
    {
      _id: "malt_ragi",
      type: "cereal_based",
      name: { en: "Sprouted Ragi Malt", kn: "ಮೊಳಕೆ ಬರಿಸಿದ ರಾಗಿ ಗಂಜಿ" },
      description: {
        en: "Calcium powerhouse drink suitable for all ages.",
        kn: "ಎಲ್ಲಾ ವಯಸ್ಸಿನವರಿಗೆ ಸೂಕ್ತವಾದ ಕ್ಯಾಲ್ಸಿಯಂ ಯುಕ್ತ ಪಾನೀಯ.",
      },
      ingredients: {
        en: [
          "2 tbsp Sprouted Ragi flour",
          "1 cup Water/Milk",
          "Jaggery (sweet) or Salt/Buttermilk (savory)",
        ],
        kn: [
          "2 ಚಮಚ ಮೊಳಕೆ ಬರಿಸಿದ ರಾಗಿ ಹಿಟ್ಟು",
          "1 ಕಪ್ ನೀರು/ಹಾಲು",
          "ಬೆಲ್ಲ (ಸಿಹಿ) ಅಥವಾ ಉಪ್ಪು/ಮಜ್ಜಿಗೆ (ಖಾರ)",
        ],
      },
      nutrition_facts: {
        calories: 130,
        protein: "4g",
        carbs: "28g",
        fiber: "3g",
        calcium_mg: 344,
      },
      benefits: {
        en: ["Strengthens bones", "Cools the body", "Sustained energy"],
        kn: [
          "ಮೂಳೆಗಳನ್ನು ಬಲಪಡಿಸುತ್ತದೆ",
          "ದೇಹವನ್ನು ತಂಪಾಗಿಸುತ್ತದೆ",
          "ನಿರಂತರ ಶಕ್ತಿ ನೀಡುತ್ತದೆ",
        ],
      },
      is_active: true,
    },
    {
      _id: "malt_millets",
      type: "cereal_based",
      name: { en: "Siridhanya (Millet) Malt", kn: "ಸಿರಿಧಾನ್ಯ ಗಂಜಿ" },
      description: {
        en: "A low-glycemic drink made from Foxtail or Little Millet.",
        kn: "ನವಣೆ ಅಥವಾ ಸಾಮೆ ಅಕ್ಕಿಯಿಂದ ಮಾಡಿದ ಕಡಿಮೆ ಸಕ್ಕರೆ ಅಂಶದ ಪಾನೀಯ.",
      },
      ingredients: {
        en: ["2 tbsp Millet flour", "Water", "Vegetables (optional)"],
        kn: ["2 ಚಮಚ ಸಿರಿಧಾನ್ಯದ ಹಿಟ್ಟು", "ನೀರು", "ತರಕಾರಿಗಳು (ಬೇಕಿದ್ದರೆ)"],
      },
      nutrition_facts: {
        calories: 120,
        protein: "4.5g",
        carbs: "24g",
        fiber: "5g",
      },
      benefits: {
        en: ["Diabetes control", "Easy digestion", "Gluten-free"],
        kn: ["ಮಧುಮೇಹ ನಿಯಂತ್ರಣ", "ಸುಲಭ ಜೀರ್ಣಕ್ರಿಯೆ", "ಗ್ಲುಟನ್ ಮುಕ್ತ"],
      },
      is_active: true,
    },
    {
      _id: "malt_ashgourd",
      type: "vegetable_based",
      name: { en: "Ash Gourd Juice (Winter Melon)", kn: "ಬೂದುಗುಂಬಳಕಾಯಿ ರಸ" },
      description: {
        en: "The highest pranic energy food, excellent for brain and nerves.",
        kn: "ಅತ್ಯುನ್ನತ ಪ್ರಾಣಶಕ್ತಿ ಹೊಂದಿರುವ ಆಹಾರ, ಮೆದುಳು ಮತ್ತು ನರಗಳಿಗೆ ಅತ್ಯುತ್ತಮ.",
      },
      ingredients: {
        en: ["1 cup Ash Gourd cubes", "Water", "Lemon", "Pepper"],
        kn: ["1 ಕಪ್ ಬೂದುಗುಂಬಳಕಾಯಿ ತುಂಡುಗಳು", "ನೀರು", "ನಿಂಬೆ", "ಮೆಣಸು"],
      },
      nutrition_facts: {
        calories: 15,
        protein: "0.5g",
        carbs: "3g",
        fiber: "1g",
      },
      benefits: {
        en: ["Increases energy", "Sharpens intellect", "Highly alkaline"],
        kn: [
          "ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ",
          "ಬುದ್ಧಿಶಕ್ತಿ ಚುರುಕುಗೊಳಿಸುತ್ತದೆ",
          "ಕ್ಷಾರೀಯ ಗುಣ ಹೊಂದಿದೆ",
        ],
      },
      is_active: true,
    },
  ],
};

// ==========================================
// 2. Execution Function
// ==========================================
async function seedDB() {
  try {
    // 1. Connect
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully ✔");

    // 2. Clear existing data to avoid duplicates
    console.log("Clearing old data...");
    await Program.deleteMany({});
    await Soup.deleteMany({});
    await Malt.deleteMany({});

    // 3. Insert new data
    console.log("Inserting new data...");

    // Insert single program details document
    // Ensure your Program model schema matches the `seedData.program_details` structure
    await Program.create(seedData.program_details);

    // Insert arrays
    await Soup.insertMany(seedData.soups);
    await Malt.insertMany(seedData.malts);

    console.log("Database Seeded Successfully! 🌱");
    console.log(`- Added 1 Program Config`);
    console.log(`- Added ${seedData.soups.length} Soups`);
    console.log(`- Added ${seedData.malts.length} Malts`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding Failed ❌", err);
    console.error(err); // Print the full error for easier debugging
    process.exit(1);
  }
}

// Run the function
seedDB();
