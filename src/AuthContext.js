// // AuthContext.js
// import React, { createContext, useState, useContext } from 'react';

// // Create AuthContext
// const AuthContext = createContext();

// // AuthProvider component to provide context to other components
// export const AuthProvider = ({ children }) => {
//   const [username, setUsername] = useState(null);  // Holds the logged-in username

//   const login = (name) => {
//     setUsername(name);  // Set username on login
//   };

//   const logout = () => {
//     setUsername(null);  // Clear username on logout
//   };

//   return (
//     <AuthContext.Provider value={{ username, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Manage authentication state
  const [user, setUser] = useState(localStorage.getItem('user')||'');

  const login = (usernameOrEmail) => {
    // Simulate login by setting isAuthenticated to true and saving user data
    setIsAuthenticated(true);
    console.log("usernameOrEmail",usernameOrEmail);
    setUser(usernameOrEmail);
    localStorage.setItem('user', JSON.stringify(usernameOrEmail));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
