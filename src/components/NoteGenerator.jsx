import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const NoteGenerator = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notesPdf, setNotesPdf] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleGenerateNotes = async () => {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    setLoading(true);
    setNotesPdf(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/generate-notes",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.notes) {
        setNotesPdf(response.data.notes);
      }
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadNotes = () => {
    if (!notesPdf) return;

    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${notesPdf}`;
    link.download = "Generated_Notes.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="uploader-cover">
        <h1>Generate Notes</h1>
      <div className="box">
        <div
          className="dragdrop"
          {...getRootProps()}
          style={{
            backgroundColor: isDragActive ? "#f0f8ff" : "#ffffff",
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

        <button
          onClick={handleGenerateNotes}
          disabled={loading}
          className="btn btn-outline-dark mt-2"
        >
          {loading ? "Generating Notes..." : "Generate Notes"}
        </button>

        {notesPdf && (
          <button
            onClick={handleDownloadNotes}
            className="btn btn-outline-dark mt-2"
          >
            Download Notes
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteGenerator;
