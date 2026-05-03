# Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dietbudget
JWT_SECRET=your_very_secure_jwt_secret_key_change_in_production
NODE_ENV=development
```

### 3. Start MongoDB (if local)
```bash
mongod
```

Or use MongoDB Atlas (cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update MONGODB_URI in `.env`

### 4. Seed Database
```bash
node seed.js
```

This will insert 20+ affordable Indian foods into the database.

### 5. Start Backend Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 30,
  "gender": "male",
  "height": 175,
  "weight": 75,
  "activityLevel": "moderate",
  "dailyBudget": 200,
  "dietPreference": "non-vegetarian",
  "goal": "maintenance"
}

Response: {
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "bmi": 24.5,
    "bmiCategory": "normal",
    "dailyCalorieNeed": 2600,
    "targetCalories": 2600
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "message": "Login successful",
  "token": "...",
  "user": {...}
}
```

#### Get Profile (Protected)
```
GET /api/auth/me
Authorization: Bearer <token>

Response: {
  "success": true,
  "user": {...}
}
```

#### Update Profile (Protected)
```
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "weight": 70,
  "dailyBudget": 250,
  "goal": "weightLoss"
}

Response: {
  "message": "Profile updated successfully",
  "user": {...}
}
```

### Food Endpoints

#### Get All Foods
```
GET /api/foods?category=grain&dietType=vegetarian

Query Parameters:
- category: grain, legume, protein, vegetable, fruit, dairy, oil, spice
- dietType: vegetarian, non-vegetarian, vegan

Response: {
  "success": true,
  "count": 5,
  "foods": [...]
}
```

#### Get Cheapest Foods
```
GET /api/foods/cheap?dietType=vegetarian

Response: {
  "success": true,
  "foods": [...]
}
```

#### Get Single Food
```
GET /api/foods/:id

Response: {
  "success": true,
  "food": {
    "_id": "...",
    "name": "White Rice",
    "category": "grain",
    "nutrition": {
      "calories": 130,
      "protein": 2.7,
      "carbohydrates": 28,
      "fats": 0.3,
      "fiber": 0.4
    },
    "costPerUnit": 40,
    "unitSize": "1 kg",
    "costPer100g": 4
  }
}
```

### Diet Plan Endpoints

#### Generate Diet Plan (Protected)
```
POST /api/diet-plans/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "duration": "1week",
  "goalType": "maintenance"
}

Duration Options: 1week, 2weeks, 1month
Goal Options: weightLoss, maintenance, weightGain

Response: {
  "success": true,
  "message": "Diet plan generated successfully",
  "dietPlan": {
    "_id": "...",
    "userId": "...",
    "targetCalories": 2600,
    "meals": [
      {
        "mealType": "breakfast",
        "foods": [...],
        "totalCalories": 650,
        "totalProtein": 20,
        "totalCost": 45
      },
      ...
    ],
    "dailySummary": {
      "totalCalories": 2580,
      "totalProtein": 85,
      "totalCarbs": 260,
      "totalFats": 75,
      "totalCost": 185
    }
  }
}
```

#### Get User's Diet Plans (Protected)
```
GET /api/diet-plans?status=active
Authorization: Bearer <token>

Query Parameters:
- status: active, completed, archived

Response: {
  "success": true,
  "count": 2,
  "dietPlans": [...]
}
```

#### Get Single Diet Plan (Protected)
```
GET /api/diet-plans/:id
Authorization: Bearer <token>

Response: {
  "success": true,
  "dietPlan": {...}
}
```

### Intake Tracking Endpoints

#### Log Food Intake (Protected)
```
POST /api/intake/log
Authorization: Bearer <token>
Content-Type: application/json

{
  "foodId": "...",
  "quantity": 100,
  "mealType": "breakfast"
}

Meal Types: breakfast, lunch, dinner, snack

Response: {
  "success": true,
  "message": "Food logged successfully",
  "intakeLog": {
    "_id": "...",
    "userId": "...",
    "date": "2024-05-02",
    "entries": [
      {
        "_id": "...",
        "foodName": "Rice",
        "quantity": 100,
        "mealType": "breakfast",
        "calories": 130,
        "protein": 2.7,
        "carbs": 28,
        "fats": 0.3
      }
    ],
    "totalCalories": 130,
    "totalProtein": 2.7,
    "totalCarbs": 28,
    "totalFats": 0.3
  }
}
```

#### Get Today's Intake (Protected)
```
GET /api/intake/today
Authorization: Bearer <token>

Response: {
  "success": true,
  "intakeLog": {...}
}
```

#### Get Intake by Date (Protected)
```
GET /api/intake/:date
Authorization: Bearer <token>

Date Format: YYYY-MM-DD (e.g., 2024-05-02)

Response: {
  "success": true,
  "intakeLog": {...}
}
```

#### Remove Intake Entry (Protected)
```
DELETE /api/intake/:entryId
Authorization: Bearer <token>

Response: {
  "success": true,
  "message": "Entry removed",
  "intakeLog": {...}
}
```

## Database Schemas

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  gender: String (male, female, other),
  height: Number (cm),
  weight: Number (kg),
  activityLevel: String,
  dailyBudget: Number,
  dietPreference: String,
  goal: String,
  bmi: Number,
  bmiCategory: String,
  dailyCalorieNeed: Number,
  targetCalories: Number,
  timestamps: true
}
```

### Food Schema
```javascript
{
  name: String (unique),
  category: String,
  nutrition: {
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fats: Number,
    fiber: Number
  },
  costPerUnit: Number,
  unitSize: String,
  costPer100g: Number,
  dietType: [String],
  season: String,
  active: Boolean,
  timestamps: true
}
```

## Common Errors & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Ensure MongoDB is running or check MONGODB_URI in .env

### JWT Authentication Failed
```
Error: Token is not valid
```
Solution: Ensure JWT_SECRET in .env matches the one used for token generation

### Duplicate Key Error
```
Error: E11000 duplicate key error
```
Solution: Email already exists. Use a different email address.

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123","age":30,"gender":"male","height":175,"weight":75,"activityLevel":"moderate","dailyBudget":200,"dietPreference":"non-vegetarian","goal":"maintenance"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Get Foods
curl http://localhost:5000/api/foods

# Get Profile (replace TOKEN with your JWT)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/auth/me
```

## Development Tips

1. **Use Postman** for API testing: https://www.postman.com/
2. **Enable request logging** in server.js to debug
3. **Use MongoDB Compass** to view database: https://www.mongodb.com/products/compass
4. **Check console for errors** while debugging

## Performance Notes

- Database queries use indexes for faster lookups
- JWT tokens expire in 7 days
- Password hashing uses bcryptjs with 10 salt rounds
- Calorie calculations use efficient formulas

For more help, check the main README.md file.
