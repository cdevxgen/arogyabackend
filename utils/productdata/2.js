db.products.insertOne({
  sku: "AGMALT002",
  title: "Sugar Control Malt",
  slug: "sugar-control-malt",
  category: {
    id: "67b436f72d143f02904f72b2",
    name: "Health Mixes",
  },
  img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762882449/4_v1rwmq.jpg",
  imageURLs: [
    {
      _id: "69130b523a01591484cc89f1",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762882449/5_tu2nmq.jpg",
    },
    {
      _id: "69130b523a01591484cc89f2",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762882450/6_p8577h.jpg",
    },
  ],
  variants: [
    {
      variantId: "VAR001",
      label: "250g",
      price: 240,
      discount: 10,
      finalPrice: 216,
      stock: 100,
      unit: "1 pack",
    },
    {
      variantId: "VAR002",
      label: "500g",
      price: 430,
      discount: 15,
      finalPrice: 365,
      stock: 70,
      unit: "1 pack",
    },
    {
      variantId: "VAR003",
      label: "1kg",
      price: 800,
      discount: 20,
      finalPrice: 640,
      stock: 40,
      unit: "1 pack",
    },
  ],
  status: "in-stock",
  offerDate: {
    startDate: ISODate("2025-02-10T00:00:00.000Z"),
    endDate: ISODate("2025-03-10T00:00:00.000Z"),
  },
  description:
    "Sugar Control Malt is made from a powerful blend of ragi and select millets, combined with organic Guduchi, Jamun seeds, and Amla. This natural mix helps support healthy blood sugar levels, boost metabolism, and keep you active throughout the day.",
  additionalInformation: [
    {
      key: "Ingredients",
      value: "Guduchi, Amla, Jamun Seeds, Ragi, Foxtail Millet, Fenugreek etc.",
    },
    {
      key: "Kannada Ingredients",
      value: "ಅಮೃತ ಬಳ್ಳಿ, ಆಮ್ಲ, ನೇರಳೆ ಬೀಜ, ರಾಗಿ, ಸಿರಿಧಾನ್ಯ, ಮೆಂತ್ಯ ಇತ್ಯಾದಿ",
    },
    {
      key: "Benefits",
      value:
        "Helps regulate blood sugar, boosts metabolism, purifies blood, supports digestive health.",
    },
    {
      key: "GUDUCHI",
      value:
        "Helps remove toxins, purifies blood & helps reduce high levels of blood sugar.",
    },
    {
      key: "JOWAR",
      value: "Good for diabetes and is gluten-free.",
    },
    {
      key: "MILLETS",
      value: "Helps fight diabetes & pre-diabetes.",
    },
    {
      key: "JAMUN SEEDS",
      value:
        "Aids digestion, detoxifies the body, brings down blood sugar levels.",
    },
    {
      key: "AMLA",
      value:
        "Helps utilize blood glucose effectively to control high blood sugar levels.",
    },
    {
      key: "How to Use (Malt)",
      value:
        "Mix 2 tbsp powder with water or milk, boil for 3 minutes, and serve warm. Add rock salt, roasted cumin, or lemon juice for taste.",
    },
    {
      key: "How to Use (Dosa/Idli Batter)",
      value:
        "Add 2–3 tbsp to 1 cup of regular dosa/idli batter. Rest for 15–20 mins before cooking.",
    },
    {
      key: "How to Use (Chapathi/Rotti)",
      value:
        "Add 2 tbsp to 1 cup wheat flour while kneading dough. Rest for 10–15 mins before cooking.",
    },
  ],
  shippingInfo: {
    weight: "1kg",
    dimensions: "15x10x8 cm",
    deliveryTime: "3–5 business days",
  },
  featured: true,
  tags: ["sugar control", "ragi malt", "diabetes care", "millet mix"],
  videoId: "0jIeCAOkgcQ",
  reviews: [
    {
      _id: "67b84aef4b004073e9feed0b",
      userId: "67b84aa4ca97b0d47ff51f9e",
      rating: 5,
      comment:
        "Tastes great and keeps me energetic all day — perfect for sugar management.",
      date: ISODate("2025-02-15T09:00:00.000Z"),
    },
  ],
  seo: {
    metaTitle: "Sugar Control Malt | Natural Diabetic Care Mix",
    metaDescription:
      "A healthy millet-based malt with Guduchi, Jamun, and Amla to support balanced blood sugar and boost metabolism.",
    keywords: ["sugar control", "ragi malt", "diabetic health", "natural mix"],
  },
  createdAt: ISODate("2025-02-18T07:29:59.081Z"),
  updatedAt: ISODate("2025-02-18T07:29:59.081Z"),
});
