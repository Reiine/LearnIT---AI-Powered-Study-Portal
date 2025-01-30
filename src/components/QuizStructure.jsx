import React, { useState } from "react";
import questions from './questions';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizStructure = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (questionIndex, option) => {
    const selectedOption = option.split('.')[0];
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz-container container py-5">
      <h2 className="text-center">Quiz</h2>
      {questions.map((q, index) => (
        <div key={index} className="quiz-question mb-4 p-4 border rounded shadow-sm">
          <h4>{q.question}</h4>
          <div className="options">
            {q.options.map((option, i) => (
              <div key={i} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleOptionChange(index, option)}
                  disabled={showResults}
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
          </div>
          {showResults && (
            <p className={`result-text ${selectedAnswers[index] === q.correctAnswer ? "correct" : "incorrect"}`}>
              {selectedAnswers[index] === q.correctAnswer
                ? "✅ Correct"
                : `❌ Incorrect (Answer: ${q.correctAnswer})`}
            </p>
          )}
        </div>
      ))}
      {!showResults && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default QuizStructure;
