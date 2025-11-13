db.products.insertOne({
  sku: "AGMALT007",
  title: "Nava Shakti Malt",
  slug: "nava-shakti-malt",
  category: {
    id: "67b436f72d143f02904f72b2",
    name: "Health Mixes",
  },
  img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762885485/20_vhkr1m.jpg",
  imageURLs: [
    {
      _id: "69130b523a01591484cc8a03",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762885480/21_xjwuhk.jpg",
    },
    {
      _id: "69130b523a01591484cc8a04",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762885480/22_gdgxev.jpg",
    },
  ],
  variants: [
    {
      variantId: "VAR001",
      label: "250g",
      price: 240,
      discount: 10,
      finalPrice: 216,
      stock: 120,
      unit: "1 pack",
    },
    {
      variantId: "VAR002",
      label: "500g",
      price: 450,
      discount: 15,
      finalPrice: 382,
      stock: 80,
      unit: "1 pack",
    },
    {
      variantId: "VAR003",
      label: "1kg",
      price: 840,
      discount: 20,
      finalPrice: 672,
      stock: 50,
      unit: "1 pack",
    },
  ],
  status: "in-stock",
  offerDate: {
    startDate: ISODate("2025-02-10T00:00:00.000Z"),
    endDate: ISODate("2025-03-10T00:00:00.000Z"),
  },
  description:
    "Nava Shakti Malt is a powerhouse of nine wholesome millets blended with nutritious dry fruits to provide complete nourishment. Rich in fiber, protein, and essential minerals, it boosts energy, supports digestion, and enhances immunity for an active lifestyle.",
  additionalInformation: [
    {
      key: "Ingredients",
      value: "Nine different millets, Dry fruits etc.",
    },
    {
      key: "Kannada Ingredients",
      value: "ಸಿರಿಧಾನ್ಯಗಳು , ಡ್ರೈ ಫ್ರೂಟ್ ಇತ್ಯಾದಿ",
    },
    {
      key: "NINE DIFFERENT MILLETS",
      value:
        "A powerhouse of fiber, protein, and essential minerals that boost energy, improve digestion, and enhance overall immunity. Supports heart health, regulates metabolism, and keeps you active throughout the day.",
    },
    {
      key: "DRY FRUITS",
      value:
        "Rich in natural vitamins, minerals, and antioxidants that strengthen the body, improve stamina, and promote healthy vitality.",
    },
    {
      key: "How to Use (Malt)",
      value:
        "Mix 2 tbsp powder with water or milk, boil for 3 minutes, and serve. Add rock salt, roasted cumin, or lemon juice for taste.",
    },
    {
      key: "How to Use (Dosa/Idli Batter)",
      value:
        "Add 2–3 tbsp to 1 cup dosa/idli batter. Rest for 15–20 mins before cooking.",
    },
    {
      key: "How to Use (Chapathi/Rotti)",
      value:
        "Add 2 tbsp to 1 cup wheat flour while kneading dough. Rest for 10–15 mins before cooking.",
    },
    {
      key: "How to Use (Smoothies & Shakes)",
      value:
        "Add 1 tbsp of malt powder to your smoothie or milkshake for added fiber, protein, and natural energy.",
    },
    {
      key: "How to Use (Energy Balls / Laddoos)",
      value:
        "Combine malt powder with dates, honey, and dry fruits, roll into balls, and store for a perfect on-the-go snack.",
    },
  ],
  shippingInfo: {
    weight: "1kg",
    dimensions: "15x10x8 cm",
    deliveryTime: "3–5 business days",
  },
  featured: true,
  tags: ["nava shakti", "millet mix", "energy malt", "health mix"],
  videoId: "kFRmmtzHyh8",
  reviews: [
    {
      _id: "67b84aef4b004073e9feed10",
      userId: "67b84aa4ca97b0d47ff51f9e",
      rating: 5,
      comment:
        "Very nutritious and tasty! I feel full of energy throughout the day. Great for family use.",
      date: ISODate("2025-02-19T09:00:00.000Z"),
    },
  ],
  seo: {
    metaTitle: "Nava Shakti Malt | Nine Millet Energy & Immunity Mix",
    metaDescription:
      "A nourishing blend of nine wholesome millets and dry fruits to boost energy, digestion, and immunity naturally.",
    keywords: [
      "nava shakti",
      "millet malt",
      "energy mix",
      "immunity drink",
      "health mix",
    ],
  },
  createdAt: ISODate("2025-02-18T07:29:59.081Z"),
  updatedAt: ISODate("2025-02-18T07:29:59.081Z"),
});
