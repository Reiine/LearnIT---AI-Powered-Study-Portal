import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { collection, db, addDoc,doc, getDoc } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

const QuizStructure = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [userOrganization, setUserOrganization] = useState('');
  const [title, setTitle] = useState("");
  const role = Cookies.get("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrganization = async () => {
      const userId = Cookies.get("userId");

      if (!userId) {
        console.error("User is not logged in.");
        return;
      }

      try {
        // Fetch user details from Firestore
        const userRef = doc(db, "teachers", userId); // Assuming user is a teacher; adjust if necessary
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserOrganization(userDoc.data().organization); // Assuming organization is stored here
        } else {
          console.error("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };

    fetchUserOrganization();
  }, []);

  const handleApprove = async () => {
    if (!title) {
      alert("Please enter a title for the quiz.");
      return;
    }

    // Prepare the data to be stored in the database
    const approvedQuiz = {
      title,
      questions,
      organization: userOrganization, // Example organization, replace with actual value
    };

    try {
      // Store the quiz data in Firebase Firestore
      const quizzesCollection = collection(db, "quizzes"); // Get reference to 'quizzes' collection
      await addDoc(quizzesCollection, approvedQuiz); // Add the quiz to Firestore

      // Reset the state after approval
      setTitle("");
      setSelectedAnswers({});
      setShowResults(false);
      alert("Quiz approved and saved to Firestore!");
    } catch (error) {
      console.error("Error saving quiz to Firestore: ", error);
      alert("Error saving quiz to Firestore.");
    } finally {
      navigate("/");
    }
  };

  // Function to handle cancel action by the teacher
  const handleCancel = () => {
    // Reset the state to cancel the approval process
    setTitle("");
    setSelectedAnswers({});
    setShowResults(false);
    alert("Quiz approval has been canceled.");
    navigate("/");
  };

  const handleOptionChange = (questionIndex, option) => {
    const selectedOption = option.split(".")[0];
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const renderOptions = (options, questionIndex) => {
    return options.map((option, i) => (
      <div key={i} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={`question-${questionIndex}`}
          value={option}
          onChange={() => handleOptionChange(questionIndex, option)}
          disabled={role === "teacher" || showResults} // Disable for teachers
        />
        <label className="form-check-label">{option}</label>
      </div>
    ));
  };

  const renderResult = (questionIndex, correctAnswer) => {
    return (
      <p
        className={`result-text ${
          selectedAnswers[questionIndex] === correctAnswer
            ? "correct"
            : "incorrect"
        }`}
      >
        {selectedAnswers[questionIndex] === correctAnswer
          ? "✅ Correct"
          : `❌ Incorrect (Answer: ${correctAnswer})`}
      </p>
    );
  };

  return (
    <div className="quiz-container container py-5">
      <h2 className="text-center">Quiz</h2>
      {role === "teacher" && (
        <div className="mb-4">
          <label htmlFor="quizTitle" className="form-label">
            Title
          </label>
          <input
            id="quizTitle"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>
      )}

      {questions.map((q, index) => (
        <div
          key={index}
          className="quiz-question mb-4 p-4 border rounded shadow-sm"
        >
          <h4>{q.question}</h4>
          <div className="options">{renderOptions(q.options, index)}</div>
          {showResults &&
            role === "student" &&
            renderResult(index, q.correctAnswer)}

          {role === "teacher" && (
            <div className="mt-3">
              <strong>Correct Answer: </strong>
              <p>{q.correctAnswer}</p>
            </div>
          )}
        </div>
      ))}

      {!showResults && role === "student" && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {role === "teacher" && (
        <div className="text-center mt-4">
          <button
            className="btn btn-success"
            onClick={() => handleApprove(title)}
            disabled={!title}
          >
            Approve
          </button>
          <button className="btn btn-danger ms-2" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizStructure;
