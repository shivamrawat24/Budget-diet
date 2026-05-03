# Frontend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env.local` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Development Server
```bash
npm start
```

Frontend opens on `http://localhost:3000`

## Project Structure

### Components
- **Navbar.js** - Top navigation bar with user info
- **ProfileForm.js** - User profile creation/edit form
- **IntakeTracker.js** - Daily food intake logging and tracking
- **DietPlanGenerator.js** - Generate personalized diet plans
- **FoodBrowser.js** - Browse and filter foods database

### Pages
- **LoginPage.js** - Authentication (login/register)
- **DashboardPage.js** - Main dashboard with all features

### Context (State Management)
- **AuthContext.js** - Authentication state and methods
- **DietContext.js** - Diet plan and intake state

### Utilities
- **helpers.js** - Helper functions (BMI, calorie calculations, API calls)

### Styles
- **App.css** - Global styles and buttons
- **Navbar.css** - Navigation bar styles
- **components.css** - Component-specific styles
- **pages.css** - Page-specific styles

## Features Walkthrough

### 1. Authentication
- Register with user profile (name, email, password, metrics)
- Login with email and password
- JWT token stored in localStorage
- Automatic profile calculation on registration

### 2. Dashboard
Four main tabs:

#### Daily Intake Tracker
- View today's calorie consumption
- Log foods with quantities
- See remaining calories
- Track macros (protein, carbs, fats)
- Remove logged entries
- Visual progress bar

#### Generate Plan
- Select plan duration (1 week, 2 weeks, 1 month)
- Choose goal (weight loss, maintenance, gain)
- View AI-generated meal plan
- See cost breakdown
- Optimized for budget constraints

#### Food Database
- Browse all 20+ foods
- Filter by category, cost, nutrition
- Sort by cheapest, highest calories, protein
- See cost per calorie
- Filter by diet type

#### Profile
- View all profile information
- BMI and category
- Daily calorie needs
- Current goal and preferences
- Budget information

### 3. State Management

#### AuthContext
```javascript
{
  user,              // Current user object
  token,             // JWT token
  loading,           // Loading state
  error,             // Error message
  isAuthenticated,   // Boolean
  register(),        // Register function
  login(),           // Login function
  logout(),          // Logout function
  getProfile(),      // Fetch profile
  updateProfile()    // Update profile
}
```

#### DietContext
```javascript
{
  foods,             // Array of foods
  dietPlans,         // Array of diet plans
  intakeLog,         // Today's intake log
  loading,           // Loading state
  error,             // Error message
  fetchFoods(),      // Get foods
  fetchCheapestFoods(),    // Get cheapest foods
  generateDietPlan(),      // Generate plan
  fetchDietPlans(),        // Get user's plans
  logIntake(),       // Log food
  fetchTodayIntake(),      // Get today's intake
  removeIntakeEntry()      // Remove entry
}
```

## Component Usage

### ProfileForm
```jsx
<ProfileForm 
  onSubmit={(formData) => handleSubmit(formData)}
  initialData={user}
  isLoading={loading}
/>
```

### IntakeTracker
```jsx
<IntakeTracker 
  targetCalories={user.targetCalories}
/>
```

### DietPlanGenerator
```jsx
<DietPlanGenerator 
  user={user}
/>
```

### FoodBrowser
```jsx
<FoodBrowser />
```

## API Integration

All API calls go through axios interceptors in Context files.

### Making API Calls
```javascript
// In components, use context hooks
const { login, error } = useContext(AuthContext);
const { logIntake, intakeLog } = useContext(DietContext);

// Call functions
await login(email, password);
await logIntake(foodId, quantity, mealType);
```

## Styling Guide

### Color Scheme
- Primary Green: `#4CAF50`
- Secondary Blue: `#2196F3`
- Dark Text: `#333`, `#2c3e50`
- Light Gray: `#f5f5f5`, `#ecf0f1`
- Danger Red: `#f44336`

### Responsive Breakpoints
- Desktop: 1920px+
- Tablet: 768px - 1024px
- Mobile: < 768px

### CSS Structure
- Global styles in `App.css`
- Component styles in `components.css`
- Page styles in `pages.css`
- Navigation styles in `Navbar.css`

## Common Tasks

### Add New Page
1. Create file in `src/pages/`
2. Import in `App.js`
3. Add route/navigation

### Add New Component
1. Create file in `src/components/`
2. Add styles to `components.css`
3. Import and use in pages

### Add New Context
1. Create file in `src/context/`
2. Create Context and Provider
3. Wrap app or specific components

### Fetch Data from API
```javascript
const { fetchFoods, foods, loading } = useContext(DietContext);

useEffect(() => {
  fetchFoods();
}, [fetchFoods]);
```

## Debugging Tips

1. **Check Browser Console** - Look for errors/warnings
2. **Use React DevTools** - Install browser extension
3. **Check Network Tab** - See API requests/responses
4. **Console Logs** - Add `console.log()` for debugging
5. **Inspect Elements** - Use browser inspector for styling

## Performance Optimization

- Components using Context re-render on state changes
- Use `useCallback` to memoize functions
- Use `useMemo` for expensive calculations
- Lazy load components if needed

## Testing

```bash
npm test
```

## Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## Deployment

### Deploy to Netlify
```bash
npm run build
# Drag build folder to Netlify
```

### Deploy to Vercel
```bash
vercel
```

### Deploy to GitHub Pages
1. Update package.json: `"homepage": "https://yourusername.github.io/DietBudget"`
2. Install gh-pages: `npm install gh-pages --save-dev`
3. Add scripts to package.json
4. Run `npm run deploy`

## Troubleshooting

### API Connection Error
```
Error: Network Error
```
- Ensure backend is running on http://localhost:5000
- Check .env.local has correct API_URL
- Check browser console for CORS errors

### Token Not Persisting
- Check localStorage in browser DevTools
- Ensure JWT is being saved on login
- Check token expiration (7 days default)

### Components Not Re-rendering
- Ensure using correct Context
- Check state is being updated properly
- Verify dependencies in useEffect

### Styling Not Applying
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file imports
- Use browser inspector to verify CSS

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest 2 versions

## Additional Resources

- React Docs: https://react.dev
- Axios: https://axios-http.com
- React Router: https://reactrouter.com
- Context API: https://react.dev/reference/react/useContext

For more help, check the main README.md file.
