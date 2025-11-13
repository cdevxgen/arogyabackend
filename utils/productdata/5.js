db.products.insertOne({
  sku: "AGMALT005",
  title: "Bone Energy Malt",
  slug: "bone-energy-malt",
  category: {
    id: "67b436f72d143f02904f72b2",
    name: "Health Mixes",
  },
  img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762884101/13_cqrmmg.jpg",
  imageURLs: [
    {
      _id: "69130b523a01591484cc89fd",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762884106/14_atez65.jpg",
    },
    {
      _id: "69130b523a01591484cc89fe",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762884101/15_rhwlzc.jpg",
    },
  ],
  variants: [
    {
      variantId: "VAR001",
      label: "250g",
      price: 270,
      discount: 10,
      finalPrice: 243,
      stock: 120,
      unit: "1 pack",
    },
    {
      variantId: "VAR002",
      label: "500g",
      price: 490,
      discount: 15,
      finalPrice: 417,
      stock: 70,
      unit: "1 pack",
    },
    {
      variantId: "VAR003",
      label: "1kg",
      price: 920,
      discount: 20,
      finalPrice: 736,
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
    "Bone Energy Malt is a rich source of natural calcium and plant-based protein, made from ragi, millets, and nutrient-dense seeds. Enriched with Garden Cress and Chia Seeds, it helps strengthen bones, improve stamina, and support overall vitality.",
  additionalInformation: [
    {
      key: "Ingredients",
      value:
        "Ashwagandha, Pearl millet, Garden Cress seeds, Chia seeds, Dry fruits, Kodo millet etc.",
    },
    {
      key: "Kannada Ingredients",
      value: "ಅಶ್ವಗಂಧ, ಸಜ್ಜೆ, ಆಳವಿ ಬೀಜ, ಚಿಯಾ ಬೀಜ, ಅರ್ಕ, ಡ್ರೈ ಫ್ರೂಟ್ ಇತ್ಯಾದಿ",
    },
    {
      key: "ASHWAGANDHA",
      value:
        "Strengthens bones and muscles, reduces fatigue, and supports overall energy and endurance.",
    },
    {
      key: "PEARL MILLET",
      value:
        "Rich in calcium and iron, it helps improve bone strength and supports joint health.",
    },
    {
      key: "GARDEN CRESS SEEDS",
      value:
        "Excellent source of calcium and protein that help strengthen bones and prevent bone loss.",
    },
    {
      key: "CHIA SEEDS",
      value:
        "Packed with omega-3 fatty acids and calcium to promote bone density and flexibility.",
    },
    {
      key: "DRY FRUITS",
      value:
        "Provide essential minerals like magnesium and phosphorus that support healthy bones.",
    },
    {
      key: "KODO MILLET",
      value:
        "Helps improve stamina, supports calcium absorption, and maintains bone health naturally.",
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
  tags: ["bone health", "calcium rich", "energy mix", "millet malt"],
  videoId: "ZpZBfZf5O7A",
  reviews: [
    {
      _id: "67b84aef4b004073e9feed0e",
      userId: "67b84aa4ca97b0d47ff51f9e",
      rating: 5,
      comment:
        "Great taste and noticeable improvement in my stamina and joint flexibility. Highly recommend for all ages!",
      date: ISODate("2025-02-17T09:00:00.000Z"),
    },
  ],
  seo: {
    metaTitle: "Bone Energy Malt | Natural Calcium & Stamina Booster",
    metaDescription:
      "A nutritious malt made with millets, garden cress, chia, and dry fruits — supports bone health, stamina, and vitality.",
    keywords: [
      "bone health",
      "calcium",
      "chia seeds",
      "energy malt",
      "millets",
    ],
  },
  createdAt: ISODate("2025-02-18T07:29:59.081Z"),
  updatedAt: ISODate("2025-02-18T07:29:59.081Z"),
});
