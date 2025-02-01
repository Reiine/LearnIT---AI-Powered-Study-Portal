import { useEffect, useState } from "react";
import "./App.css";
import Uploader from "./components/Uploader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizStructure from "./components/QuizStructure";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Cookies from "js-cookie";
import NoteGenerator from "./components/NoteGenerator";
import UploadNotes from "./components/UploadNotes";
import FetchUploads from "./components/FetchUploads";
import Quiz from "./components/Quiz";
import TeacherMcq from "./components/TeacherMcq";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLogin, setIsLogin] = useState(Cookies.get("isLogin") === "true");
  const [userName, setUserName] = useState(Cookies.get("userName") || "");

  useEffect(() => {
    const checkLoginState = () => {
      const state = Cookies.get("isLogin");
      setIsLogin(state === "true");

      const storedUserName = Cookies.get("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    checkLoginState();

    window.addEventListener("storage", checkLoginState);

    return () => {
      window.removeEventListener("storage", checkLoginState);
    };
  }, []);

  return (
    <Router>
      <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
      {isLogin ? (
        <Routes>
          <Route path="/uploader" element={<Uploader setQuestions={setQuestions} questions={questions} />} />
          <Route path="/quiz" element={<QuizStructure setQuestions={setQuestions} questions={questions} />} />
          <Route path="/notes-generator" element={<NoteGenerator />} />
          <Route path="/" element={<Dashboard isLogin={isLogin} userName={userName} />} />
          <Route path="/login" element={<Dashboard isLogin={isLogin} userName={userName} />} />
          <Route path="/register" element={<Dashboard isLogin={isLogin} userName={userName} />} />
          <Route path="/teacher-mcqs" element={<TeacherMcq setQuestions={setQuestions}  />} />
          <Route path="/upload-notes" element={<UploadNotes />} />
          <Route path="/fetch-notes" element={<FetchUploads/>} />
          <Route path="*" element={<Error />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} setUserName={setUserName} />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;
