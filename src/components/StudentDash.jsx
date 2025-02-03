import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./css/StudentDash.css";

const StudentDash = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <div className="student-dash-page">
      <Container className="py-5">
        <h2 className="mb-4 text-center">
          Welcome, <span className="user-name">{userName}</span>
        </h2>
        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-lg card-hover">
              <Card.Body className="text-center">
                <Card.Title>Upload & Store Notes</Card.Title>
                <Card.Text>
                  Store your teaching materials securely in Firestore.
                </Card.Text>
                <button
                  onClick={() => navigate("/upload-notes")}
                  className="cust-btn"
                >
                  Upload Notes
                </button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-lg card-hover">
              <Card.Body className="text-center">
                <Card.Title>Quiz Generator</Card.Title>
                <Card.Text>
                  Create quizzes automatically from your uploaded notes.
                </Card.Text>
                <button
                  onClick={() => navigate("/uploader")}
                  className="cust-btn"
                >
                  Generate Quiz
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg card-hover">
              <Card.Body className="text-center">
                <Card.Title>Note Maker</Card.Title>
                <Card.Text>
                  Generate crisp notes automatically from your uploaded file.
                </Card.Text>
                <button
                  onClick={() => navigate("/notes-generator")}
                  className="cust-btn"
                >
                  Generate Notes
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg card-hover">
              <Card.Body className="text-center">
                <Card.Title>View Notes</Card.Title>
                <Card.Text>
                  Refer to the notes uploaded by you or your teacher.
                </Card.Text>
                <button
                  onClick={() => navigate("/fetch-notes")}
                  className="cust-btn"
                >
                  Access
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg card-hover">
              <Card.Body className="text-center">
                <Card.Title>Solve Teacher's Quiz</Card.Title>
                <Card.Text>
                  Answer these quizzes approved by the teacher.
                </Card.Text>
                <button
                  onClick={() => navigate("/teacher-mcqs")}
                  className="cust-btn"
                >
                  Solve
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg card-hover">
              <Card.Body className="text-center">
                <Card.Title>Chat with ai</Card.Title>
                <Card.Text>
                  Process pdf and talk with ai.
                </Card.Text>
                <button
                  onClick={() => navigate("/pdfchat")}
                  className="cust-btn"
                >
                  Solve
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentDash;
