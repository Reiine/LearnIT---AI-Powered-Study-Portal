import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { db, collection, query, where, getDocs } from "../config/firebase-config"; // Import Firestore database
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigate hook for routing

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Attempting to login with email:", email);

      // Query Firestore for matching email in students collection
      const studentQuery = query(
        collection(db, "students"),
        where("email", "==", email)
      );
      const studentSnapshot = await getDocs(studentQuery);

      // Query Firestore for matching email in teachers collection
      const teacherQuery = query(
        collection(db, "teachers"),
        where("email", "==", email)
      );
      const teacherSnapshot = await getDocs(teacherQuery);

      console.log(
        "Student Data:",
        studentSnapshot.docs.map((doc) => doc.data())
      );
      console.log(
        "Teacher Data:",
        teacherSnapshot.docs.map((doc) => doc.data())
      );

      if (!studentSnapshot.empty) {
        const studentData = studentSnapshot.docs[0].data();
        if (studentData.password === password) {
          localStorage.setItem("role", "student");
          localStorage.setItem("userId", studentSnapshot.docs[0].id);
          console.log("Login successful as student!");
          navigate("/dashboard");
          return;
        } else {
          setError("Invalid password.");
          return;
        }
      }

      if (!teacherSnapshot.empty) {
        const teacherData = teacherSnapshot.docs[0].data();
        if (teacherData.password === password) {
          localStorage.setItem("role", "teacher");
          localStorage.setItem("userId", teacherSnapshot.docs[0].id);
          console.log("Login successful as teacher!");
          navigate("/dashboard");
          return;
        } else {
          setError("Invalid password.");
          return;
        }
      }

      setError("User not found.");
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <h4 className="text-center mb-4">Login</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  onClick={handleLogin}
                  className="btn btn-outline-dark w-100"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
