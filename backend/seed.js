/**
 * DATABASE SEEDING SCRIPT
 * Run this once to populate the database with affordable Indian foods
 * Usage: node seed.js
 */

const mongoose = require('mongoose');
require('dotenv').config();
const Food = require('./models/Food');
const affordableFoods = require('./data/affordableFoods');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing foods
    await Food.deleteMany({});
    console.log('Cleared existing food records');

    // Insert new foods
    const insertedFoods = await Food.insertMany(affordableFoods);
    console.log(`Seeded ${insertedFoods.length} food items successfully!`);

    // Display some sample records
    console.log('\nSample Foods Added:');
    insertedFoods.slice(0, 5).forEach((food) => {
      console.log(`- ${food.name}: ₹${food.costPerUnit}/${food.unitSize}`);
    });

    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log('\nDatabase seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
