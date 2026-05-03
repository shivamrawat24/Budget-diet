# Quick Start Guide - Budget Diet Planner

Follow these steps to get the application running in 5 minutes!

## Prerequisites
- Node.js installed (v14+)
- MongoDB installed locally OR MongoDB Atlas account
- Git (optional)

## Backend Setup (5 minutes)

### Step 1: Navigate to backend
```bash
cd backend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Create .env file
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Step 4: Edit .env (if using local MongoDB)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dietbudget
JWT_SECRET=my_secure_secret_key_12345
NODE_ENV=development
```

### Step 5: Make sure MongoDB is running
```bash
# Windows - If installed via chocolatey or MSI
# mongod should start automatically

# Mac
brew services start mongodb-community

# Or manually
mongod
```

### Step 6: Seed database (add food items)
```bash
node seed.js
```

You should see:
```
Seeded 20 food items successfully!
```

### Step 7: Start backend
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════╗
║  Budget Diet Planner Backend              ║
║  Server running on port 5000              ║
║  Environment: development                 ║
╚════════════════════════════════════════════╝
```

✅ Backend is ready!

## Frontend Setup (3 minutes)

### Step 1: Open new terminal, navigate to frontend
```bash
cd frontend
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Create .env.local file
```bash
# Windows
echo REACT_APP_API_URL=http://localhost:5000/api > .env.local

# Mac/Linux
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
```

### Step 4: Start frontend
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

✅ Frontend is ready!

## Using the App

### First Login
1. Click "Register" on the login page
2. Fill in your details:
   - Name, email, password
   - Body metrics (height, weight, age, gender)
   - Activity level
   - Daily food budget (₹200-500 recommended)
   - Diet preference
   - Goal (weight loss/maintenance/gain)

3. System automatically calculates:
   - BMI
   - Daily calorie needs
   - Target calories based on goal

4. Click "Create Profile"

### Dashboard Features

#### Daily Intake Tracker
- Select a food from dropdown
- Enter quantity in grams
- Choose meal type (breakfast/lunch/dinner/snack)
- Click "Log Food"
- See real-time calorie updates

#### Generate Diet Plan
- Choose plan duration
- Select your goal
- Click "Generate Plan"
- See breakdown of meals and costs

#### Food Database
- Browse all 20+ foods
- Filter by category or cost
- Sort by cheapest/highest nutrition
- See cost per calorie

#### Profile
- View all your information
- BMI and category
- Daily calorie needs
- Budget and goals

## Sample Test Account

After seeding, you can create a test account:
```
Email: test@example.com
Password: password123
Age: 30
Height: 170 cm
Weight: 70 kg
Activity: Moderate
Budget: ₹200/day
Goal: Maintenance
```

## Common Issues

### "Cannot find module" error
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### "MongoDB connection refused"
```bash
# Make sure MongoDB is running
# Windows: mongod
# Mac: brew services start mongodb-community
```

### "Port 5000 already in use"
```bash
# Kill process on port 5000
# Windows: netstat -ano | findstr :5000
# Then: taskkill /PID <PID> /F
```

### "Cannot GET /api/auth/me"
- Ensure backend is running on :5000
- Check REACT_APP_API_URL in .env.local

## What to Try Next

1. **Register a user** with your details
2. **Generate a diet plan** for 1 week
3. **Log some foods** and track calories
4. **Browse the food database**
5. **Update your profile** and see calculations change

## File Explanations

- **server.js** - Main backend application
- **seed.js** - Populates database with foods
- **App.js** - Main React component
- **AuthContext.js** - Handles login/registration
- **DietContext.js** - Handles diet planning and intake
- **.env** - Backend configuration
- **.env.local** - Frontend configuration

## Need Help?

Check these files for detailed info:
- `backend/README.md` - Backend documentation
- `frontend/README.md` - Frontend documentation
- `README.md` - Full project documentation

## Stopping the App

- Backend: Press `Ctrl+C` in backend terminal
- Frontend: Press `Ctrl+C` in frontend terminal

## Tips

✅ Keep both terminals open during development
✅ Use Chrome DevTools (F12) for debugging
✅ Check browser console for errors
✅ If something breaks, restart both servers
✅ MongoDB must be running for backend to work

---

**Enjoy planning your budget-friendly diet! 🥗💪**

If you get stuck, check the detailed README.md files in each folder.
