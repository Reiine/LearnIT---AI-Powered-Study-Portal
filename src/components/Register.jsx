import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase-config"; // Import Firestore and Auth instance
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Register.css"; // Custom CSS for additional styling
import { Link,useNavigate } from "react-router-dom";

const Register = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });
  const [organizations, setOrganizations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const orgCollection = collection(db, "organizations");
      const orgSnapshot = await getDocs(orgCollection);
      const orgList = orgSnapshot.docs.map((doc) => doc.data().name);
      setOrganizations(orgList);
    };
    fetchOrganizations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Store user info in Firestore
      const userType = activeTab === "student" ? "students" : "teachers";

      if (user?.uid) {
        const userRef = doc(db, userType, user.uid);

        const userData = {
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          role: userType, // Optional, helps in role-based logic
        };

        if (userType === "students") {
          userData.quizStats = []; // Track attempted quizzes
        } else {
          userData.myStudents = []; // Store assigned students
        }

        await setDoc(userRef, userData);
      } else {
        console.error("User UID is missing.");
      }

      // If teacher, add organization if not exists
      if (activeTab === "teacher") {
        const orgCollection = collection(db, "organizations");
        const orgSnapshot = await getDocs(orgCollection);
        const orgNames = orgSnapshot.docs.map((doc) => doc.data().name);

        if (!orgNames.includes(formData.organization)) {
          await addDoc(orgCollection, { name: formData.organization });
        }
      }

      // Clear form after submission
      setFormData({ name: "", email: "", password: "", organization: "" });
      alert("Registration successful!");
      navigate('/login')
    } catch (error) {
      setErrorMessage(error.message.split(":")[1].trim());
      console.error("Error during registration: ", error);
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div className="register-container">
        <div className="card register-card shadow-lg">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 font-weight-bold">Join LearnIT</h2>
            <p className="text-center text-muted mb-4">
              Create an account to get started.
            </p>
            <ul className="nav nav-tabs nav-justified mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "student" ? "active" : ""
                  }`}
                  onClick={() => handleTabSwitch("student")}
                >
                  Student
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "teacher" ? "active" : ""
                  }`}
                  onClick={() => handleTabSwitch("teacher")}
                >
                  Teacher
                </button>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className={`tab-pane fade ${
                  activeTab === "student" ? "show active" : ""
                }`}
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select Organization</option>
                      {organizations.map((org, index) => (
                        <option key={index} value={org}>
                          {org}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  <button type="submit" className="btn btn-primary w-100">
                    Register as Student
                  </button>
                </form>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "teacher" ? "show active" : ""
                }`}
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="organization"
                      placeholder="Organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  <button type="submit" className="btn btn-primary w-100">
                    Register as Teacher
                  </button>
                </form>
              </div>
            </div>
            <p className="text-center text-muted mt-3">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
