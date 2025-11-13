db.products.insertOne({
  sku: "BPCTRL001",
  title: "BP Control Malt",
  slug: "bp-control-malt",
  category: {
    id: "health-malt",
    name: "Health Malt",
  },
  img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762878641/bp-control-malt2_kxim0x.jpg",
  imageURLs: [
    {
      _id: "",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762878645/bp-control-malt1_s18ttw.jpg",
    },
    {
      _id: "",
      img: "https://res.cloudinary.com/dcbmadhmo/image/upload/v1762878645/bp-control-malt3_kzaeh0.jpg",
    },
  ],
  variantone: [
    {
      variantId: "BPCTRL-250G",
      label: "250g Pack",
      price: 199,
      discount: 10,
      finalPrice: 179,
      stock: 50,
      unit: "250g",
    },
    {
      variantId: "BPCTRL-500G",
      label: "500g Pack",
      price: 349,
      discount: 10,
      finalPrice: 314,
      stock: 30,
      unit: "500g",
    },
    {
      variantId: "BPCTRL-1000G",
      label: "1000g Pack",
      price: 698,
      discount: 10,
      finalPrice: 612,
      stock: 30,
      unit: "1000g",
    },
  ],
  varianttwo: [
    {
      flavorId: "F01",
      name: "Elaichi",
      slug: "elaichi",
      label: "250g Pack",
      price: 20,
      discount: 0,
      finalPrice: 20,
      stock: 40,
    },
    {
      flavorId: "F02",
      name: "Cumin & Pepper",
      slug: "cumin-pepper",
      label: "250g Pack",
      price: 25,
      discount: 0,
      finalPrice: 25,
      stock: 35,
    },
  ],
  status: "in-stock",
  offerDate: {
    startDate: ISODate("2025-11-01T00:00:00Z"),
    endDate: ISODate("2025-12-01T00:00:00Z"),
  },
  description: `BP Control Malt is a natural blend of wholesome millets and herbs crafted to help maintain healthy blood pressure levels. 
  Enriched with Guduchi, Cumin, and Horse Gram, it supports heart health, improves circulation, and promotes overall wellness.`,

  additionalInformation: [
    {
      key: "Ingredients",
      value:
        "Jamun seeds, Little Millet, Barnyard Millet, Cumin Seeds, Horse Gram, and Almond.\nನೇರಳೆ ಬೀಜ, ಸಾಮೆ, ಊದಲು, ಜೀರಿಗೆ, ಹುರುಳಿ ಕಾಳು, ಬಾದಾಮಿ.",
    },
    {
      key: "Benefits",
      value: `JAMUN SEEDS: Help regulate blood pressure, improve heart health, and aid in better circulation. They also support blood sugar balance and naturally detoxify the body.\n
  LITTLE MILLET: Rich in magnesium and potassium, it helps regulate blood pressure and improve heart function.\n
  BARNYARD MILLET: Low in sodium and high in fiber, it aids in maintaining stable blood pressure levels.\n
  CUMIN SEEDS: Promotes healthy digestion and supports balanced cholesterol levels.\n
  HORSE GRAM: Helps reduce cholesterol, improve metabolism, and support heart health.`,
    },
    {
      key: "How to Use",
      value: `To Prepare Malt:\n- Mix 2 tablespoons of powder with a little cold water to form a slurry.\n- Add 200 ml of water or milk, boil for 3 minutes, and serve.\n- Add rock salt, roasted cumin, pepper, or lemon juice for taste if desired.\n\n
  In Dosa or Idli Batter:\n- Add 2 to 3 tablespoons of malt powder to 1 cup of regular dosa or idli batter.\n- Mix well and let it rest for 15–20 minutes before cooking.\n- This enhances nutrition, adds flavor, and makes the dosa or idli softer.\n\n
  In Chapathi or Rotti Dough:\n- Add 2 tablespoons of malt powder to 1 cup of wheat flour while kneading the dough.\n- Mix with water as usual and let it rest for 10–15 minutes.\n- It improves taste, softness, and provides extra fiber and minerals.`,
    },
  ],

  shippingInfo: {
    weight: "500g",
    dimensions: "15x10x5 cm",
    deliveryTime: "3-5 business days",
  },

  featured: true,
  tags: ["bp control", "malt", "natural", "herbal", "heart health", "millet"],
  videoId: "BPCTRL_VIDEO_01",
  reviews: [
    {
      userId: "USR001",
      rating: 5,
      comment: "Refreshing and soothing taste — perfect evening tea.",
      date: ISODate("2025-02-15T09:00:00Z"),
    },
    {
      userId: "USR002",
      rating: 4,
      comment: "Great product for managing BP naturally.",
      date: ISODate("2025-03-10T10:30:00Z"),
    },
  ],
  seo: {
    metaTitle: "BP Control Malt | Natural Blood Pressure Support",
    metaDescription:
      "BP Control Malt is a natural blend of herbs and millets that supports heart health and helps regulate blood pressure levels.",
    keywords: [
      "bp control",
      "malt",
      "millets",
      "herbal",
      "blood pressure",
      "natural health",
    ],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});
