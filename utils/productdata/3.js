db.products.insertOne({
  sku: "AGMALT003",
  title: "Fat Control Malt",
  slug: "fat-control-malt",
  category: {
    id: "67b436f72d143f02904f72b2",
    name: "Health Mixes",
  },
  img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762883005/7_twfjgp.jpg",
  imageURLs: [
    {
      _id: "69130b523a01591484cc89f7",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762883011/8_ulery4.jpg",
    },
    {
      _id: "69130b523a01591484cc89f8",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762883004/9_wrbvlr.jpg",
    },
  ],
  variants: [
    {
      variantId: "VAR001",
      label: "250g",
      price: 250,
      discount: 10,
      finalPrice: 225,
      stock: 100,
      unit: "1 pack",
    },
    {
      variantId: "VAR002",
      label: "500g",
      price: 460,
      discount: 15,
      finalPrice: 391,
      stock: 70,
      unit: "1 pack",
    },
    {
      variantId: "VAR003",
      label: "1kg",
      price: 850,
      discount: 20,
      finalPrice: 680,
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
    "Fat Control Malt is a nutritious blend of super seeds and millets enriched with Triphala to help manage body fat naturally. It supports healthy metabolism, digestion, and energy balance, making it an ideal choice for maintaining a fit and active lifestyle.",
  additionalInformation: [
    {
      key: "Ingredients",
      value:
        "Triphala, Chia Seeds, Flax Seeds, Foxtail Millet, Browntop Millet, Sorghum, etc.",
    },
    {
      key: "Kannada Ingredients",
      value: "ತ್ರಿಫಲ ಚೂರ್ಣ, ಚಿಯಾ ಬೀಜ, ಅಗಸೆ ಬೀಜ, ಕೊರ್ಲೆ, ನವಣೆ, ಬಿಳಿ ಜೋಳ ಇತ್ಯಾದಿ",
    },
    {
      key: "TRIPHALA",
      value:
        "Supports natural detoxification, improves digestion, and helps manage body fat effectively.",
    },
    {
      key: "CHIA SEEDS",
      value:
        "Rich in fiber and omega-3 fatty acids that help reduce fat accumulation and promote fullness.",
    },
    {
      key: "FLAX SEEDS",
      value:
        "Aid in lowering cholesterol levels and support healthy metabolism and weight management.",
    },
    {
      key: "FOXTAIL MILLET",
      value:
        "Low in calories and high in fiber, it helps burn excess fat and keeps you energized.",
    },
    {
      key: "BROWNTOP MILLET",
      value:
        "Promotes better digestion and supports fat metabolism for a leaner body.",
    },
    {
      key: "SORGHUM",
      value:
        "Rich in antioxidants and fiber that help reduce cholesterol and support heart and liver health.",
    },
    {
      key: "How to Use (Malt)",
      value:
        "Mix 2 tbsp powder with water or milk, boil for 3 minutes, and serve. Add rock salt, roasted cumin, or lemon juice for taste.",
    },
    {
      key: "How to Use (Dosa/Idli Batter)",
      value:
        "Add 2–3 tbsp to 1 cup dosa/idli batter. Rest for 15–20 mins before cooking for better taste and nutrition.",
    },
    {
      key: "How to Use (Chapathi/Rotti)",
      value:
        "Add 2 tbsp to 1 cup wheat flour while kneading dough. Rest for 10–15 mins for soft and fiber-rich chapathis.",
    },
  ],
  shippingInfo: {
    weight: "1kg",
    dimensions: "15x10x8 cm",
    deliveryTime: "3–5 business days",
  },
  featured: true,
  tags: ["fat control", "triphala mix", "fitness", "malt"],
  videoId: "tMtnj8Qv2R8",
  reviews: [
    {
      _id: "67b84aef4b004073e9feed0c",
      userId: "67b84aa4ca97b0d47ff51f9e",
      rating: 5,
      comment:
        "Excellent taste and helps me feel light throughout the day. Perfect for my fitness routine.",
      date: ISODate("2025-02-15T09:00:00.000Z"),
    },
  ],
  seo: {
    metaTitle: "Fat Control Malt | Natural Weight Management Mix",
    metaDescription:
      "A nutritious blend of Triphala, Chia, Flax, and Millets to support fat metabolism, digestion, and healthy energy balance.",
    keywords: [
      "fat control",
      "triphala malt",
      "weight management",
      "millet mix",
    ],
  },
  createdAt: ISODate("2025-02-18T07:29:59.081Z"),
  updatedAt: ISODate("2025-02-18T07:29:59.081Z"),
});
