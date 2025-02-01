import React, { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { Card, Button, Spinner, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/TeacherMcq.css"; // Custom CSS for additional styling

function TeacherMcq({ setQuestions }) {
  const [quizzes, setQuizzes] = useState([]);
  const [userOrganization, setUserOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOrganization = async () => {
      try {
        const userId = Cookies.get("userId");

        if (!userId) {
          setError("User authentication failed. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch user details from Firestore
        const userRef = doc(db, "students", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserOrganization(userDoc.data().organization);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrganization();
  }, []);

  useEffect(() => {
    if (!userOrganization) return;

    const fetchQuizzes = async () => {
      try {
        const quizzesCollection = collection(db, "quizzes");
        const q = query(
          quizzesCollection,
          where("organization", "==", userOrganization)
        );

        const querySnapshot = await getDocs(q);
        const fetchedQuizzes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (fetchedQuizzes.length > 0) {
          setQuizzes(fetchedQuizzes);
        } else {
          setError("No quizzes available for your organization.");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    };

    fetchQuizzes();
  }, [userOrganization]);

  const handleTakeQuiz = async (quiz) => {
    try {
      const quizzesCollection = collection(db, "quizzes");
      const q = query(quizzesCollection, where("title", "==", quiz.title));
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const quizData = querySnapshot.docs[0].data(); 
        const questions = quizData.questions || []; 
  
        setQuestions(questions);
        navigate("/quiz");
      } else {
        setError("No quiz found with this title.");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };
  

  return (
    <div className="teacher-mcq-page">
      <Container className="py-5">
        <h2 className="text-center mb-4 font-weight-bold">Available Quizzes</h2>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}
        <div className="d-flex flex-wrap justify-content-center">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="m-3 quiz-card">
              <Card.Body className="text-center">
                <Card.Title className="mb-3">{quiz.title}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => handleTakeQuiz(quiz)}
                  className="w-100"
                >
                  Take Quiz
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default TeacherMcq;
