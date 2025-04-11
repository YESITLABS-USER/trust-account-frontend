import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../redux/slices/User/userSlice";

const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
  const { user, setUser } = useAuth();
  const { loading, isUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isUser){
      dispatch(userInfo());
    } else {
      setUser(isUser)
    }
  },[isUser])

  if (loading) {
    return <div>Loading...</div>; 
  }

  // If user is not logged in or doesn't have the required role, redirect to login
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;



// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import axios from "axios";

// const baseURL = import.meta.env.VITE_BACKEND_URL;  // Use import.meta.env instead of process.env

// const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
//   const { user, setUser } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = JSON.parse(localStorage.getItem("trust-account"))?.token;
//       if (token) {
//         try {
//           const response = await axios.get(`${baseURL}/protected`, { headers: { Authorization: `Bearer ${token}` }});
          
//           if (response.data?.message === "Invalid token.") {
//             toast
//             localStorage.removeItem("trust-account");
//             setUser(null);
//             return;
//           }
//           setUser(response.data.user);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//           localStorage.removeItem("trust-account");
//           setUser(null); // Clear user data on error
//         }
//       } else {
//         setUser(null);  // No token, clear user data
//         localStorage.removeItem("trust-account");
//       }

//       setLoading(false);
//     };

//     fetchUserData();
//   }, [setUser]);

//   if (loading) {
//     return <div>Loading...</div>; // You can replace this with a spinner or custom loading component
//   }

//   // If user is not logged in or doesn't have the required role, redirect to login
//   if (!user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" />;
//   }

//   return element;
// };

// export default PrivateRoute;
