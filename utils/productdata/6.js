db.products.insertOne({
  sku: "AGMALT006",
  title: "Ragi Malt",
  slug: "ragi-malt",
  category: {
    id: "67b436f72d143f02904f72b2",
    name: "Health Mixes",
  },
  img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762884867/16_cce4r3.jpg",
  imageURLs: [
    {
      _id: "69130b523a01591484cc8a00",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762884874/17_djmas9.jpg",
    },
    {
      _id: "69130b523a01591484cc8a01",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762884867/18_j5m1tf.jpg",
    },
  ],
  variants: [
    {
      variantId: "VAR001",
      label: "250g",
      price: 220,
      discount: 10,
      finalPrice: 198,
      stock: 120,
      unit: "1 pack",
    },
    {
      variantId: "VAR002",
      label: "500g",
      price: 410,
      discount: 15,
      finalPrice: 349,
      stock: 80,
      unit: "1 pack",
    },
    {
      variantId: "VAR003",
      label: "1kg",
      price: 780,
      discount: 20,
      finalPrice: 624,
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
    "Ragi Malt is a wholesome blend of sprouted ragi and selected millets, enriched with natural herbs like Amla and Guduchi. It helps strengthen bones, support digestion, and maintain energy levels throughout the day. A perfect choice for a healthy and active lifestyle.",
  additionalInformation: [
    {
      key: "Ingredients",
      value: "Ragi, Peanuts, Fenugreek seeds, Horse gram etc.",
    },
    {
      key: "Kannada Ingredients",
      value: "ರಾಗಿ, ಕಡಲೆಕಾಯಿ ಬೀಜ, ಮೆಂತ್ಯ, ಹುರುಳಿ ಕಾಳು ಇತ್ಯಾದಿ",
    },
    {
      key: "RAGI",
      value:
        "A rich source of calcium and iron that strengthens bones, improves stamina, and supports overall health.",
    },
    {
      key: "PEANUTS",
      value:
        "Provide natural protein and healthy fats that boost energy and aid muscle growth.",
    },
    {
      key: "FENUGREEK SEEDS",
      value:
        "Help manage cholesterol, improve digestion, and support a healthy metabolism.",
    },
    {
      key: "HORSE GRAM",
      value:
        "Rich in protein and fiber, it helps detoxify the body, support weight management, and strengthen bones and muscles.",
    },
    {
      key: "How to Use (Malt)",
      value:
        "Mix 2 tbsp of powder with water or milk, boil for 3 minutes, and serve. Add rock salt, roasted cumin, or lemon juice for taste.",
    },
    {
      key: "How to Use (Dosa/Idli Batter)",
      value:
        "Add 2–3 tbsp to 1 cup of dosa/idli batter. Rest for 15–20 mins before cooking.",
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
  tags: ["ragi", "calcium", "energy malt", "millet mix"],
  videoId: "VY8Eay1G3Bg",
  reviews: [
    {
      _id: "67b84aef4b004073e9feed0f",
      userId: "67b84aa4ca97b0d47ff51f9e",
      rating: 5,
      comment:
        "Tastes authentic and gives a great energy boost every morning. Love the natural flavor of sprouted ragi!",
      date: ISODate("2025-02-18T09:00:00.000Z"),
    },
  ],
  seo: {
    metaTitle: "Ragi Malt | Natural Energy & Bone Strength Mix",
    metaDescription:
      "A nutritious blend of sprouted ragi, millets, and herbs like Amla and Guduchi — supports bone health, stamina, and daily energy.",
    keywords: ["ragi malt", "calcium drink", "energy malt", "millet mix"],
  },
  createdAt: ISODate("2025-02-18T07:29:59.081Z"),
  updatedAt: ISODate("2025-02-18T07:29:59.081Z"),
});
