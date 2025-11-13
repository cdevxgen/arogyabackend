db.products.insertOne({
  sku: "AGMALT004",
  title: "Memory Power Malt",
  slug: "memory-power-malt",
  category: {
    id: "67b436f72d143f02904f72b2",
    name: "Health Mixes",
  },
  img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762883584/10_k368xp.jpg",
  imageURLs: [
    {
      _id: "69130b523a01591484cc89fa",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762883584/11_qux69r.jpg",
    },
    {
      _id: "69130b523a01591484cc89fb",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762883584/12_l1oozv.jpg",
    },
  ],
  variants: [
    {
      variantId: "VAR001",
      label: "250g",
      price: 260,
      discount: 10,
      finalPrice: 234,
      stock: 120,
      unit: "1 pack",
    },
    {
      variantId: "VAR002",
      label: "500g",
      price: 470,
      discount: 15,
      finalPrice: 400,
      stock: 70,
      unit: "1 pack",
    },
    {
      variantId: "VAR003",
      label: "1kg",
      price: 880,
      discount: 20,
      finalPrice: 704,
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
    "Memory Power Malt is a wholesome mix of Brahmi, nutrient-rich millets, and multigrains, blended with natural dry fruits. It helps enhance focus, boost memory, and support brain health while providing sustained energy for daily activities.",
  additionalInformation: [
    {
      key: "Ingredients",
      value: "Brahmi, Dry Fruits, Millets, and Multigrains",
    },
    {
      key: "Kannada Ingredients",
      value: "ಬ್ರಾಹ್ಮೀ , ಡ್ರೈ ಫ್ರೂಟ್, ಸಿರಿಧಾನ್ಯ, ಬಹುಧಾನ್ಯ, ಇತ್ಯಾದಿ",
    },
    {
      key: "BRAHMI",
      value:
        "Enhances memory, focus, and concentration while calming the mind and reducing stress.",
    },
    {
      key: "DRY FRUITS",
      value:
        "Provide essential nutrients and healthy fats that nourish the brain and boost energy levels.",
    },
    {
      key: "MILLETS",
      value:
        "Rich in B-vitamins and minerals that support brain function and improve overall vitality.",
    },
    {
      key: "MULTIGRAINS",
      value:
        "Offer balanced nutrition, promote steady energy release, and support mental alertness.",
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
        "Add 2 tbsp to 1 cup of wheat flour while kneading dough. Rest for 10–15 mins for soft and nutritious chapathis.",
    },
    {
      key: "How to Use (Smoothies & Shakes)",
      value:
        "Add 1 tbsp of malt powder to your fruit smoothie or milkshake for added fiber, protein, and natural energy.",
    },
    {
      key: "How to Use (Energy Balls / Laddoos)",
      value:
        "Combine malt powder with dates, honey, and dry fruits, roll into balls, and store — a perfect on-the-go energy snack.",
    },
  ],
  shippingInfo: {
    weight: "1kg",
    dimensions: "15x10x8 cm",
    deliveryTime: "3–5 business days",
  },
  featured: true,
  tags: ["memory", "brahmi", "brain health", "multigrain", "energy"],
  videoId: "zZbPj7j6LGA",
  reviews: [
    {
      _id: "67b84aef4b004073e9feed0d",
      userId: "67b84aa4ca97b0d47ff51f9e",
      rating: 5,
      comment:
        "Tastes great and I genuinely feel more focused throughout the day. Best for students and professionals!",
      date: ISODate("2025-02-16T09:00:00.000Z"),
    },
  ],
  seo: {
    metaTitle: "Memory Power Malt | Natural Brain & Focus Booster",
    metaDescription:
      "A nutritious mix of Brahmi, dry fruits, and multigrains designed to boost focus, memory, and overall brain health.",
    keywords: ["memory", "focus", "brahmi", "brain booster", "energy malt"],
  },
  createdAt: ISODate("2025-02-18T07:29:59.081Z"),
  updatedAt: ISODate("2025-02-18T07:29:59.081Z"),
});
