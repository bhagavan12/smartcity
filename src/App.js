// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import { AuthProvider } from './Comp/AuthContext';  // Import AuthProvider
// // import { Login, Signup } from './Comp/SignUpIn';
// // import GeoapifyPage from './Comp/Byname';
// // import PrivateRoute from './PrivateRoute';

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>
// //           <Route path="/" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />

// //           {/* Protect the GeoapifyPage route */}
// //           <Route path="/geoapify" element={<PrivateRoute><GeoapifyPage /></PrivateRoute>} />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>

// //   );
// // }

// // export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
// import { Login, Signup } from './Comp/SignUpIn';
// import GeoapifyPage from './Comp/Byname';
// import PrivateRoute from './PrivateRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* Protect GeoapifyPage */}
//           <Route path="/geoapify" element={<PrivateRoute><GeoapifyPage /></PrivateRoute>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Login, Signup } from './Comp/SignUpIn';
import GeoapifyPage from './Comp/Byname';
import PrivateRoute from './PrivateRoute';
import Navbar from './Comp/Navbar';
import LandingPage from './Comp/LandingPage';

function App() {
  return (
    // <AuthProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/geoapify" element={
            // <PrivateRoute>
              <GeoapifyPage />
            // </PrivateRoute>
          } />
        </Routes>
      </Router>
    // </AuthProvider>
  );
}

export default App;