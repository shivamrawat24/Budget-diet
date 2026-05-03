const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'grain',
        'protein',
        'vegetable',
        'fruit',
        'dairy',
        'oil',
        'spice',
        'legume',
      ],
      required: true,
    },
    cuisineType: {
      type: String,
      enum: ['indian', 'international'],
      default: 'indian',
    },

    // Nutritional Values (per 100g)
    nutrition: {
      calories: Number, // kcal
      protein: Number, // grams
      carbohydrates: Number, // grams
      fats: Number, // grams
      fiber: Number, // grams
    },

    // Cost Information
    costPerUnit: Number, // in INR
    unitSize: String, // e.g., "1 kg", "1 liter", "500g", "1 dozen"
    costPer100g: Number, // calculated automatically

    // Availability & Type
    dietType: {
      type: [String],
      enum: ['vegetarian', 'non-vegetarian', 'vegan'],
    },

    // Additional Info
    season: String, // e.g., "year-round", "seasonal"
    storage: String, // e.g., "refrigerate", "room-temperature"
    commonBrand: String, // e.g., typical shop/brand where available

    active: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Calculate cost per 100g before saving
foodSchema.pre('save', function (next) {
  if (this.unitSize && this.costPerUnit) {
    // Extract number from unitSize (e.g., "1 kg" -> 1000g)
    const sizeMatch = this.unitSize.match(/(\d+)\s*(kg|g|liter|ml|dozen|piece)/i);
    if (sizeMatch) {
      let grams = parseInt(sizeMatch[1]);
      const unit = sizeMatch[2].toLowerCase();

      if (unit === 'kg') grams *= 1000;
      else if (unit === 'liter') grams = 1000; // 1 liter ≈ 1000ml, varies by density
      else if (unit === 'ml') grams = 1; // approximate
      else if (unit === 'dozen') grams = 1200; // 12 eggs ≈ 1200g
      else if (unit === 'piece') grams = 100; // 1 piece ≈ 100g average

      this.costPer100g = (this.costPerUnit / grams) * 100;
    }
  }
  next();
});

module.exports = mongoose.model('Food', foodSchema);
