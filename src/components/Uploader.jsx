import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Uploader = ({questions,setQuestions}) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
    });

    const handleGenerateQuiz = async () => {
        if (!file) {
            alert("Please upload a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3001/generate-quiz", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setQuestions(response.data.questions);
        } catch (error) {
            console.error("Error generating quiz:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Drag and Drop Area */}
            <div
                {...getRootProps()}
                style={{
                    border: "2px dashed #007bff",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: isDragActive ? "#f0f8ff" : "#ffffff",
                    marginBottom: "10px",
                }}
            >
                <input {...getInputProps()} />
                {file ? (
                    <p>📄 {file.name} uploaded</p>
                ) : isDragActive ? (
                    <p>📂 Drop the file here...</p>
                ) : (
                    <p>📁 Drag & drop a PDF file here, or click to select one</p>
                )}
            </div>

            <button onClick={handleGenerateQuiz} disabled={loading}>
                {loading ? "Generating Quiz..." : "Generate Quiz"}
            </button>

            {questions.length > 0 && navigate('/quiz')}
        </div>
    );
};

export default Uploader;
