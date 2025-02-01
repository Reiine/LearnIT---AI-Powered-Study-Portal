import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, collection, query, where, getDocs } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import "./css/Login.css"; // Custom CSS for additional styling

const Login = ({ setIsLogin,setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      console.log("Attempting to login with email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
  
      console.log("User logged in successfully:", user);
      Cookies.set("authToken", token, { expires: 7 });
      Cookies.set("userId", user.uid, { expires: 7 });
  
      let userName = "";
      let role = "";
  
      const studentQuery = query(collection(db, "students"), where("email", "==", email));
      const studentSnapshot = await getDocs(studentQuery);
  
      if (!studentSnapshot.empty) {
        const studentData = studentSnapshot.docs[0].data();
        userName = studentData.name;
        role = "student";
      }
  
      const teacherQuery = query(collection(db, "teachers"), where("email", "==", email));
      const teacherSnapshot = await getDocs(teacherQuery);
  
      if (!teacherSnapshot.empty) {
        const teacherData = teacherSnapshot.docs[0].data();
        userName = teacherData.name;
        role = "teacher";
      }
  
      if (role) {
        Cookies.set("role", role, { expires: 7 });
        Cookies.set("userName", userName, { expires: 7 }); // Store userName in cookies
        Cookies.set("isLogin", "true", { expires: 7 });
        setIsLogin(true);
        setUserName(userName); // Update global state in App.js
  
        console.log(`Login successful as ${role} - User Name: ${userName}`);
        navigate("/");
      } else {
        setError("User role not found.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Invalid email or password.");
    }
  };
  

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-container">
        <div className="card login-card shadow-lg">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 font-weight-bold">Welcome Back!</h2>
            <p className="text-center text-muted mb-4">Please log in to access your account.</p>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
              <p className="text-center text-muted mt-3">
                Don't have an account? <Link to={"/register"} className="text-primary">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;