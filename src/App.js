import { useState } from "react";
import "./App.css";
import Uploader from "./components/Uploader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizStructure from "./components/QuizStructure";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [questions, setQuestions] = useState([]);
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        {/* <Route path="/" element={<Uploader setQuestions={setQuestions} questions={questions} />} /> */}
        <Route path="/quiz" element={<QuizStructure setQuestions={setQuestions} questions={questions} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
