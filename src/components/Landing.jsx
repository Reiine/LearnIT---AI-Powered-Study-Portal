import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Landing.css"; // Custom CSS for additional styling

const Landing = () => {
  return (
    <div className="landing-page-container">
      {/* Hero Section */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1 className="display-4 font-weight-bold">Welcome to LearnIT!</h1>
          <p className="lead">
            Your ultimate learning platform - Collaborate, learn, and grow with
            teachers and peers.
          </p>
          <hr className="my-4 bg-white" />
          <p>
            Join now to access quizzes, study materials, and track your
            progress!
          </p>
          <div className="mt-4">
            <button className="get-started-btn">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="land-info">
        <div className="container py-5">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6 d-flex flex-column align-items-start text-md-left text-center">
              <div className="details">
                <h2 className="font-weight-bold mb-4">What We Offer</h2>
                <p className="text-muted text-center ">
                  LearnIT is a collaborative platform where teachers and
                  students can interact seamlessly. Teachers can upload notes,
                  generate quizzes, and monitor student progress. Students can
                  access study materials, take quizzes, and even create their
                  own quizzes from uploaded notes.
                </p>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <img
                width={400}
                src="https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="LearnIT Features"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="container py-5 bg-light">
          <div className="row align-items-center justify-content-center ">
            <div className="col-md-6 order-md-2 d-flex flex-column align-items-start text-md-left">
              <div>
                <h2 className="font-weight-bold mb-4 text-center">Why Choose LearnIT?</h2>
                <p className="text-muted text-center ">
                  LearnIT is designed to make learning interactive and engaging.
                  Our platform adapts to your needs, offering personalized
                  quizzes and study materials. Whether you're a student aiming
                  to excel or a teacher looking to inspire, LearnIT is your
                  perfect partner.
                </p>
              </div>
            </div>
            <div className="col-md-6 order-md-1 d-flex justify-content-center">
              <img
                width={400}
                src="https://images.pexels.com/photos/209728/pexels-photo-209728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Why Choose LearnIT"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
