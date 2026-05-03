/**
 * AFFORDABLE INDIAN FOOD DATABASE
 * Focus: Low-cost, high-nutrition foods available in India
 * Prices are approximate (adjust based on region/season)
 * Nutritional values per 100g (reference: USDA, ICMR)
 */

const affordableFoods = [
  // GRAINS (Cheapest, Carb Source)
  {
    name: 'White Rice',
    category: 'grain',
    cuisineType: 'indian',
    nutrition: {
      calories: 130,
      protein: 2.7,
      carbohydrates: 28,
      fats: 0.3,
      fiber: 0.4,
    },
    costPerUnit: 40, // ₹40 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Wheat Flour (Atta)',
    category: 'grain',
    cuisineType: 'indian',
    nutrition: {
      calories: 364,
      protein: 10.3,
      carbohydrates: 76.3,
      fats: 1.5,
      fiber: 2.4,
    },
    costPerUnit: 35, // ₹35 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local mill',
  },
  {
    name: 'Roti (Whole Wheat Bread)',
    category: 'grain',
    cuisineType: 'indian',
    nutrition: {
      calories: 265,
      protein: 8.4,
      carbohydrates: 49,
      fats: 2.7,
      fiber: 6.8,
    },
    costPerUnit: 3, // ₹3 per piece (fresh from market)
    unitSize: '1 piece',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Fresh local',
  },

  // LEGUMES (Protein, Budget-Friendly)
  {
    name: 'Dal (Lentils)',
    category: 'legume',
    cuisineType: 'indian',
    nutrition: {
      calories: 116,
      protein: 9.0,
      carbohydrates: 20,
      fats: 0.4,
      fiber: 1.8,
    },
    costPerUnit: 80, // ₹80 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Chickpeas (Chana)',
    category: 'legume',
    cuisineType: 'indian',
    nutrition: {
      calories: 164,
      protein: 8.9,
      carbohydrates: 27.4,
      fats: 2.6,
      fiber: 6.2,
    },
    costPerUnit: 70, // ₹70 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },

  // PROTEIN SOURCES
  {
    name: 'Eggs',
    category: 'protein',
    cuisineType: 'indian',
    nutrition: {
      calories: 155,
      protein: 13.0,
      carbohydrates: 1.1,
      fats: 11.0,
      fiber: 0,
    },
    costPerUnit: 60, // ₹60 per dozen (5 per egg avg)
    unitSize: '1 dozen',
    dietType: ['non-vegetarian'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Peanuts (Groundnuts)',
    category: 'legume',
    cuisineType: 'indian',
    nutrition: {
      calories: 567,
      protein: 25.8,
      carbohydrates: 16.1,
      fats: 49.2,
      fiber: 2.4,
    },
    costPerUnit: 150, // ₹150 per kg (cheapest protein)
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Soya Bean',
    category: 'legume',
    cuisineType: 'indian',
    nutrition: {
      calories: 173,
      protein: 16.6,
      carbohydrates: 9.9,
      fats: 8.3,
      fiber: 2.2,
    },
    costPerUnit: 90, // ₹90 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },

  // DAIRY
  {
    name: 'Milk',
    category: 'dairy',
    cuisineType: 'indian',
    nutrition: {
      calories: 61,
      protein: 3.2,
      carbohydrates: 4.8,
      fats: 3.3,
      fiber: 0,
    },
    costPerUnit: 50, // ₹50 per liter
    unitSize: '1 liter',
    dietType: ['vegetarian'],
    season: 'year-round',
    commonBrand: 'Local dairy',
  },
  {
    name: 'Curd/Yogurt',
    category: 'dairy',
    cuisineType: 'indian',
    nutrition: {
      calories: 59,
      protein: 3.5,
      carbohydrates: 3.3,
      fats: 3.3,
      fiber: 0,
    },
    costPerUnit: 40, // ₹40 per 500ml
    unitSize: '500 ml',
    dietType: ['vegetarian'],
    season: 'year-round',
    commonBrand: 'Local dairy',
  },
  {
    name: 'Paneer (Cottage Cheese)',
    category: 'dairy',
    cuisineType: 'indian',
    nutrition: {
      calories: 321,
      protein: 25.4,
      carbohydrates: 1.2,
      fats: 25.2,
      fiber: 0,
    },
    costPerUnit: 250, // ₹250 per 500g
    unitSize: '500 g',
    dietType: ['vegetarian'],
    season: 'year-round',
    commonBrand: 'Local market',
  },

  // VEGETABLES (Budget-Friendly)
  {
    name: 'Onion',
    category: 'vegetable',
    cuisineType: 'indian',
    nutrition: {
      calories: 40,
      protein: 1.1,
      carbohydrates: 9.3,
      fats: 0.1,
      fiber: 1.7,
    },
    costPerUnit: 30, // ₹30 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Potato',
    category: 'vegetable',
    cuisineType: 'indian',
    nutrition: {
      calories: 77,
      protein: 2.0,
      carbohydrates: 17.5,
      fats: 0.1,
      fiber: 2.1,
    },
    costPerUnit: 20, // ₹20 per kg (cheapest vegetable)
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Carrot',
    category: 'vegetable',
    cuisineType: 'indian',
    nutrition: {
      calories: 41,
      protein: 0.9,
      carbohydrates: 10,
      fats: 0.2,
      fiber: 2.8,
    },
    costPerUnit: 25, // ₹25 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Spinach',
    category: 'vegetable',
    cuisineType: 'indian',
    nutrition: {
      calories: 23,
      protein: 2.7,
      carbohydrates: 3.6,
      fats: 0.4,
      fiber: 2.2,
    },
    costPerUnit: 15, // ₹15 per bundle
    unitSize: '1 bundle',
    dietType: ['vegetarian', 'vegan'],
    season: 'seasonal',
    commonBrand: 'Local market',
  },
  {
    name: 'Tomato',
    category: 'vegetable',
    cuisineType: 'indian',
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbohydrates: 3.9,
      fats: 0.2,
      fiber: 1.2,
    },
    costPerUnit: 20, // ₹20 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },
  {
    name: 'Cabbage',
    category: 'vegetable',
    cuisineType: 'indian',
    nutrition: {
      calories: 25,
      protein: 1.3,
      carbohydrates: 5.8,
      fats: 0.1,
      fiber: 2.3,
    },
    costPerUnit: 15, // ₹15 per kg
    unitSize: '1 kg',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local market',
  },

  // OILS & FATS
  {
    name: 'Cooking Oil (Vegetable)',
    category: 'oil',
    cuisineType: 'indian',
    nutrition: {
      calories: 884,
      protein: 0,
      carbohydrates: 0,
      fats: 100,
      fiber: 0,
    },
    costPerUnit: 180, // ₹180 per liter
    unitSize: '1 liter',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Saffola, Fortune, etc',
  },

  // SPICES (For flavor, low cost per use)
  {
    name: 'Turmeric Powder',
    category: 'spice',
    cuisineType: 'indian',
    nutrition: {
      calories: 354,
      protein: 7.8,
      carbohydrates: 65.4,
      fats: 3.1,
      fiber: 2.1,
    },
    costPerUnit: 100, // ₹100 per 250g
    unitSize: '250 g',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local spice market',
  },
  {
    name: 'Chili Powder',
    category: 'spice',
    cuisineType: 'indian',
    nutrition: {
      calories: 318,
      protein: 14.3,
      carbohydrates: 56.6,
      fats: 17.3,
      fiber: 23.9,
    },
    costPerUnit: 120, // ₹120 per 250g
    unitSize: '250 g',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local spice market',
  },
  {
    name: 'Cumin Seeds',
    category: 'spice',
    cuisineType: 'indian',
    nutrition: {
      calories: 375,
      protein: 17.8,
      carbohydrates: 34.2,
      fats: 22.3,
      fiber: 10.5,
    },
    costPerUnit: 200, // ₹200 per 250g
    unitSize: '250 g',
    dietType: ['vegetarian', 'vegan'],
    season: 'year-round',
    commonBrand: 'Local spice market',
  },
];

module.exports = affordableFoods;
