import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">

      <div className="jumbotron text-center   text-white">
        <h1 className="display-4">Welcome to StudyBuddy!</h1>
        <p className="lead">Your personal learning companion - Take quizzes, upload study materials, and track your progress!</p>
        <hr className="my-4" />
        <p>Get started by logging in or signing up to access quizzes and study resources!</p>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <h2>What We Do?</h2>
          </div>
          <div className="col-md-6">
            <p>
              StudyBuddy is an interactive learning platform designed to help students improve their knowledge in various subjects. Teachers can upload study materials, which will be automatically converted into MCQs and notes. Students can take quizzes, upload their own study materials, and track their progress.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5 bg-light">
        <div className="row">
          <div className="col-md-6 order-md-2">
            <h2>Why Us?</h2>
          </div>
          <div className="col-md-6 order-md-1">
            <p>
              At StudyBuddy, we believe in a student-centered approach. Our platform offers a personalized learning experience by adapting quizzes and study materials to suit your individual learning style. Whether you're a student looking to improve or a teacher eager to share your knowledge, StudyBuddy is here to assist you on your learning journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <h2>How It Works?</h2>
          </div>
          <div className="col-md-6">
            <p>
              Teachers upload study materials such as PDFs, which are then automatically converted into quizzes and notes for students. Students can take quizzes, upload their own study materials for personal use, and track their progress with our detailed performance statistics.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;
