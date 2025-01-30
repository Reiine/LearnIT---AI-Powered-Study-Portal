import React, { useState, useEffect } from "react";
import { db } from "../config/firebase-config"; // Import Firestore instance
import { collection, addDoc, getDocs } from "firebase/firestore"; // Firestore functions
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [activeTab, setActiveTab] = useState("student"); // Tab state (student or teacher)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });
  const [organizations, setOrganizations] = useState([]); // State to hold fetched organizations

  // Fetch organizations from Firestore on mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      const orgCollection = collection(db, "organizations");
      const orgSnapshot = await getDocs(orgCollection);
      const orgList = orgSnapshot.docs.map(doc => doc.data().name);
      setOrganizations(orgList);
    };

    fetchOrganizations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === "student") {
        // Add student to 'students' collection
        await addDoc(collection(db, "students"), {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          organization: formData.organization,
        });
      } else {
        // Add teacher to 'teachers' collection
        await addDoc(collection(db, "teachers"), {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          organization: formData.organization,
        });

        // Add the organization to 'organizations' collection if it's not already there
        const orgCollection = collection(db, "organizations");
        const orgSnapshot = await getDocs(orgCollection);
        const orgNames = orgSnapshot.docs.map(doc => doc.data().name);

        if (!orgNames.includes(formData.organization)) {
          await addDoc(orgCollection, { name: formData.organization });
        }
      }

      // Clear form after submission
      setFormData({
        name: "",
        email: "",
        password: "",
        organization: "",
      });
      alert("Registration successful!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow-lg">
            <div className="card-body">
              {/* Tab Navigation */}
              <ul className="nav nav-tabs" id="registrationTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${activeTab === "student" ? "active" : ""}`}
                    onClick={() => handleTabSwitch("student")}
                    style={{
                        color: activeTab === "student" ? "black" : "lightgray",
                    }}
                    id="student-tab"
                    data-bs-toggle="tab"
                    href="#student"
                    role="tab"
                    aria-controls="student"
                    aria-selected={activeTab === "student"}
                  >
                    Register as Student
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${activeTab === "teacher" ? "active" : ""}`}
                    onClick={() => handleTabSwitch("teacher")}
                    style={{
                        color: activeTab === "teacher" ? "black" : "lightgray",
                    }}
                    id="teacher-tab"
                    data-bs-toggle="tab"
                    href="#teacher"
                    role="tab"
                    aria-controls="teacher"
                    aria-selected={activeTab === "teacher"}
                  >
                    Register as Teacher
                  </a>
                </li>
              </ul>

              <div className="tab-content mt-3">
                {/* Student Registration Form */}
                <div
                  className={`tab-pane fade ${activeTab === "student" ? "show active" : ""}`}
                  id="student"
                  role="tabpanel"
                  aria-labelledby="student-tab"
                >
                  <h4>Student Registration</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="organization" className="form-label">Select Organization</label>
                      <select
                        className="form-select"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Organization</option>
                        {organizations.map((org, index) => (
                          <option key={index} value={org}>
                            {org}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-outline-dark w-100">Register</button>
                  </form>
                </div>

                {/* Teacher Registration Form */}
                <div
                  className={`tab-pane fade ${activeTab === "teacher" ? "show active" : ""}`}
                  id="teacher"
                  role="tabpanel"
                  aria-labelledby="teacher-tab"
                >
                  <h4>Teacher Registration</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="organization" className="form-label">Organization</label>
                      <input
                        type="text"
                        className="form-control"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-outline-dark w-100">Register</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
