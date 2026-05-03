# Budget Diet Planner - Complete MERN Stack Application

A comprehensive web application that helps users create personalized, budget-friendly diet plans based on their body metrics, calorie needs, and financial constraints. Built with modern technology and beginner-friendly code.

## 🎯 Features

### 1. **User Profile Management**
- Collect body metrics (height, weight, age, gender)
- Automatic BMI calculation and categorization
- Daily calorie needs calculation (using Mifflin-St Jeor equation)
- Activity level tracking
- Diet preferences (vegetarian/non-vegetarian/vegan)
- Budget and goal management

### 2. **Budget-Based Diet Planning**
- Smart algorithm that generates diet plans within user's budget
- Focuses on affordable, nutritious Indian foods
- Adapts to weight loss, maintenance, or weight gain goals
- Distributes meals across breakfast, lunch, dinner, and snacks

### 3. **Daily Intake Tracking**
- Log food consumption throughout the day
- Real-time calorie and macro tracking
- Visual progress bars
- Track protein, carbohydrates, and fats
- See remaining daily intake

### 4. **Food Database**
- 20+ affordable Indian foods with nutrition data
- Filter by category, cost, and nutrition
- Find cheapest options for each food type
- Cost-per-calorie analysis

### 5. **Dashboard**
- User profile overview
- Quick statistics (BMI, daily calories, budget)
- Multiple views (Daily Tracker, Plans, Food Database, Profile)
- Clean, intuitive UI

## 📋 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (from `.env.example`)
   ```bash
   copy .env.example .env
   ```

4. **Configure environment variables**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dietbudget
   JWT_SECRET=your_secure_jwt_secret_key
   NODE_ENV=development
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Seed the database with food items**
   ```bash
   node seed.js
   ```

7. **Start the backend server**
   ```bash
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

   Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
DietBudget/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Food.js              # Food schema
│   │   ├── DietPlan.js          # Diet plan schema
│   │   └── IntakeLog.js         # Daily intake schema
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── food.js              # Food endpoints
│   │   ├── dietPlan.js          # Diet plan endpoints
│   │   └── intake.js            # Intake tracking endpoints
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── foodController.js    # Food logic
│   │   ├── dietPlanController.js # Diet generation logic
│   │   └── intakeController.js  # Intake tracking logic
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── utils/
│   │   ├── calculations.js      # BMI, calorie calculations
│   │   └── auth.js              # JWT utilities
│   ├── data/
│   │   └── affordableFoods.js   # Food database seed
│   ├── package.json
│   ├── server.js                # Main server file
│   └── seed.js                  # Database seeding script
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProfileForm.js
│   │   │   ├── IntakeTracker.js
│   │   │   ├── DietPlanGenerator.js
│   │   │   └── FoodBrowser.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   └── DashboardPage.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── DietContext.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   ├── Navbar.css
│   │   │   ├── components.css
│   │   │   └── pages.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.local
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (Protected)
- `PUT /api/auth/update-profile` - Update user profile (Protected)

### Foods
- `GET /api/foods` - Get all foods
- `GET /api/foods/cheap` - Get cheapest foods
- `GET /api/foods/:id` - Get single food
- `POST /api/foods` - Add new food (Admin)

### Diet Plans
- `POST /api/diet-plans/generate` - Generate diet plan (Protected)
- `GET /api/diet-plans` - Get user's diet plans (Protected)
- `GET /api/diet-plans/:id` - Get single diet plan (Protected)

### Intake Tracking
- `POST /api/intake/log` - Log food intake (Protected)
- `GET /api/intake/today` - Get today's intake (Protected)
- `GET /api/intake/:date` - Get intake by date (Protected)
- `DELETE /api/intake/:entryId` - Remove intake entry (Protected)
- `PUT /api/intake/water` - Update water intake (Protected)

## 📊 Calculation Logic

### BMI Calculation
```
BMI = weight (kg) / (height (m))²
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: ≥ 30
```

### Calorie Calculation (Mifflin-St Jeor)
```
For Males:
BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5

For Females:
BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161

TDEE = BMR × Activity Factor
```

### Activity Factors
- Sedentary: 1.2 (little or no exercise)
- Light: 1.375 (1-3 days/week)
- Moderate: 1.55 (3-5 days/week)
- Active: 1.725 (6-7 days/week)
- Very Active: 1.9 (physical job or training)

### Goal-Based Calorie Adjustment
- Weight Loss: -15% from TDEE
- Maintenance: Equal to TDEE
- Weight Gain: +15% to TDEE

## 🥘 Affordable Indian Foods Database

The app includes 20+ budget-friendly Indian foods:

**Grains**: Rice, Wheat Flour, Roti
**Legumes**: Dal, Chickpeas, Soya Bean, Peanuts
**Proteins**: Eggs, Paneer
**Vegetables**: Onion, Potato, Carrot, Spinach, Tomato, Cabbage
**Dairy**: Milk, Curd/Yogurt, Paneer
**Oils**: Vegetable Oil
**Spices**: Turmeric, Chili Powder, Cumin

Each food item includes:
- Nutritional values (per 100g)
- Cost information
- Diet type compatibility
- Availability

## 💡 Usage Examples

### User Registration & Profile Setup
1. User creates account with email/password
2. Enters body metrics and preferences
3. System calculates BMI and daily calorie needs
4. Profile automatically synced

### Generating a Diet Plan
1. Navigate to "Generate Plan"
2. Select duration (1 week, 2 weeks, 1 month)
3. Select goal (weight loss, maintenance, gain)
4. System generates budget-optimized meal plan
5. View meals with exact quantities and costs

### Tracking Daily Intake
1. Select food from database
2. Enter quantity in grams
3. Select meal type (breakfast, lunch, dinner, snack)
4. See real-time calorie and macro updates
5. Visual progress bar shows daily goal progress

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Mongoose schema validation
- **Protected Routes**: Middleware-based protection
- **CORS**: Configured for frontend-backend communication

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (below 768px)

CSS Grid and Flexbox for adaptive layouts

## 🎓 Learning Resources

This project is beginner-friendly and demonstrates:
- MERN stack architecture
- REST API design
- Database schema modeling
- Authentication flow
- State management with Context API
- Responsive web design
- Component-based architecture

## 🚀 Future Enhancements

- [ ] Meal planning for the week
- [ ] Grocery list generation
- [ ] Recipe suggestions
- [ ] Weight tracking over time
- [ ] Nutrition charts and analytics
- [ ] Mobile app (React Native)
- [ ] AI-powered diet suggestions (OpenAI/Claude)
- [ ] Social sharing of plans
- [ ] Community recipes
- [ ] Payment integration for premium features
- [ ] Multi-language support
- [ ] Dark mode

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Use MongoDB Atlas for cloud database

### Frontend Not Connecting to Backend
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in `.env.local`
- Check browser console for CORS errors

### Port Already in Use
```bash
# Windows - find process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## 📝 License

MIT License - Feel free to use this project for learning and personal use.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Happy Diet Planning! 🥗💪**

Built with ❤️ for budget-conscious fitness enthusiasts.
