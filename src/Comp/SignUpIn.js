// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';  // Import axios for HTTP requests
// import { useAuth } from '../AuthContext';  // Import the context
// import './AuthForm.css';
// const AuthForm = ({ title, buttonText, linkText, linkHref, linkPrompt, showUsername }) => {
//   const { login } = useAuth();  // Access login function from context
//   const [formValues, setFormValues] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (title === 'Login') {
//       // Call the login API
//       try {
//         const response = await axios.post('http://localhost:9876/api/login', {
//           email: formValues.email,
//           password: formValues.password,
//         });
//         console.log('Login successful:', response.data);

//         login(formValues.email);  // Save user data in context (if needed)
//         navigate('/geoapify');
//       } catch (error) {
//         console.error('Error during login:', error.response.data);
//       }
//     } else if (title === 'Sign Up') {
//       // Call the signup API
//       try {
//         const response = await axios.post('http://localhost:9876/api/signup', {
//           username: formValues.username,
//           email: formValues.email,
//           password: formValues.password,
//         });
//         console.log('Signup successful:', response.data);
//       } catch (error) {
//         console.error('Error during signup:', error.response.data);
//       }
//     }
//   };

//   return (
//     <div className='cont'>
//       <div className="form-container">
//         <p className="title">{title}</p>
//         <form className="form" onSubmit={handleSubmit}>
//           {showUsername && (
//             <div className="input-group">
//               <label htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 id="username"
//                 value={formValues.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formValues.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               value={formValues.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="sign">
//             {buttonText}
//           </button>
//         </form>

//         <p className="signup">
//           {linkPrompt}
//           <Link to={linkHref} rel="noopener noreferrer">
//             {linkText}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// // Components for Login and Signup pages
// export const Login = () => (
//   <AuthForm
//     title="Login"
//     buttonText="Sign in"
//     linkText="Sign up"
//     linkHref="signup"
//     linkPrompt="Don't have an account?"
//     showUsername={false}
//   />
// );

// export const Signup = () => (
//   <AuthForm
//     title="Sign Up"
//     buttonText="Create Account"
//     linkText="Sign in"
//     linkHref="/"
//     linkPrompt="Already have an account?"
//     showUsername={true}
//   />
// );

// export default AuthForm;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './AuthForm.css';

const FormInput = ({ icon: Icon, label, error, ...props }) => (
  <div className="form-group">
    <label htmlFor={props.id}>
      <Icon className="input-icon" />
      {label}
    </label>
    <input {...props} className={error ? 'error' : ''} />
    {error && (
      <div className="error-message">
        <AlertCircle className="error-icon" />
        {error}
      </div>
    )}
  </div>
);

const AuthForm = ({ title, buttonText, linkText, linkHref, linkPrompt, showUsername }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (showUsername && !formValues.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (title === 'Login') {
        const response = await axios.post('http://localhost:9876/api/login', {
          email: formValues.email,
          password: formValues.password,
        });
        
        if (response.data) {
          login(formValues.email);
          navigate('/geoapify');
        }
      } else {
        await axios.post('http://localhost:9876/api/signup', {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        });
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          {title === 'Login' ? <LogIn className="auth-icon" /> : <UserPlus className="auth-icon" />}
          <h1>{title}</h1>
        </div>

        {errors.submit && (
          <div className="form-error">
            <AlertCircle className="error-icon" />
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {showUsername && (
            <FormInput
              icon={User}
              label="Username"
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Enter your username"
              error={errors.username}
              disabled={isSubmitting}
            />
          )}

          <FormInput
            icon={Mail}
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            disabled={isSubmitting}
          />

          <FormInput
            icon={Lock}
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            disabled={isSubmitting}
          />

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : buttonText}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {linkPrompt}{' '}
            <Link to={linkHref} className="auth-link">
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Login = () => (
  <AuthForm
    title="Login"
    buttonText="Sign in"
    linkText="Sign up"
    linkHref="/signup"
    linkPrompt="Don't have an account?"
    showUsername={false}
  />
);

export const Signup = () => (
  <AuthForm
    title="Sign Up"
    buttonText="Create Account"
    linkText="Sign in"
    linkHref="/login"
    linkPrompt="Already have an account?"
    showUsername={true}
  />
);

export default AuthForm;