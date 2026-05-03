import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProfileForm from '../components/ProfileForm';
import '../styles/pages.css';

const LoginPage = ({ onLoginSuccess }) => {
  const { login, register, loading, error } = useContext(AuthContext); // ✅ FIXED

  const [isLogin, setIsLogin] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (formData) => {
    const result = await login(formData.email, formData.password);
    if (result.success) {
      onLoginSuccess();
    }
  };

  if (isRegistering) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <ProfileForm
            onSubmit={async (formData) => {
              const result = await register(formData); // ✅ FIXED
              if (result.success) {
                onLoginSuccess();
              }
            }}
            isLoading={loading}
          />
          <p className="toggle-auth">
            Already have an account?{' '}
            <button onClick={() => setIsRegistering(false)} className="link-btn">
              Login
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="login-form-wrapper">
          <h1>🍽️ Budget Diet Planner</h1>
          <p className="subtitle">Plan your diet within your budget</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              handleLogin({ email, password });
            }}
          >
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" required placeholder="your@email.com" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" required placeholder="Your password" />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="toggle-auth">
            Don't have an account?{' '}
            <button onClick={() => setIsRegistering(true)} className="link-btn">
              Register
            </button>
          </p>
        </div>

        <div className="features-highlight">
          <h2>Why Budget Diet Planner?</h2>
          <ul>
            <li>✓ Plan diets within YOUR budget</li>
            <li>✓ Track daily calorie intake</li>
            <li>✓ Access affordable Indian foods</li>
            <li>✓ Get personalized diet recommendations</li>
            <li>✓ Monitor nutrition (protein, carbs, fats)</li>
            <li>✓ Beginner-friendly interface</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;







// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import ProfileForm from '../components/ProfileForm';
// import '../styles/pages.css';

// const LoginPage = ({ onLoginSuccess }) => {
//   const { login, loading, error } = useContext(AuthContext);
//   const [isLogin, setIsLogin] = useState(true);
//   const [isRegistering, setIsRegistering] = useState(false);

//   const handleLogin = async (formData) => {
//     const result = await login(formData.email, formData.password);
//     if (result.success) {
//       onLoginSuccess();
//     }
//   };

//   if (isRegistering) {
//     return (
//       <div className="auth-page">
//         <div className="auth-container">
//           <ProfileForm
//             onSubmit={async (formData) => {
//               const result = await useContext(AuthContext).register(formData);
//               if (result.success) {
//                 onLoginSuccess();
//               }
//             }}
//             isLoading={loading}
//           />
//           <p className="toggle-auth">
//             Already have an account?{' '}
//             <button onClick={() => setIsRegistering(false)} className="link-btn">
//               Login
//             </button>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <div className="login-form-wrapper">
//           <h1>🍽️ Budget Diet Planner</h1>
//           <p className="subtitle">Plan your diet within your budget</p>

//           {error && <div className="alert alert-error">{error}</div>}

//           <form className="login-form" onSubmit={(e) => {
//             e.preventDefault();
//             const email = e.target.email.value;
//             const password = e.target.password.value;
//             handleLogin({ email, password });
//           }}>
//             <div className="form-group">
//               <label>Email</label>
//               <input type="email" name="email" required placeholder="your@email.com" />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <input type="password" name="password" required placeholder="Your password" />
//             </div>

//             <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           <p className="toggle-auth">
//             Don't have an account?{' '}
//             <button onClick={() => setIsRegistering(true)} className="link-btn">
//               Register
//             </button>
//           </p>
//         </div>

//         <div className="features-highlight">
//           <h2>Why Budget Diet Planner?</h2>
//           <ul>
//             <li>✓ Plan diets within YOUR budget</li>
//             <li>✓ Track daily calorie intake</li>
//             <li>✓ Access affordable Indian foods</li>
//             <li>✓ Get personalized diet recommendations</li>
//             <li>✓ Monitor nutrition (protein, carbs, fats)</li>
//             <li>✓ Beginner-friendly interface</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
