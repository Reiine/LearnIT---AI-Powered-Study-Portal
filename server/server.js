require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

app.post('/generate-quiz', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        // Read the uploaded PDF file
        const pdfPath = path.join(__dirname, req.file.path);
        const pdfBuffer = fs.readFileSync(pdfPath);

        // Extract text from PDF
        const pdfData = await pdfParse(pdfBuffer);
        const pdfText = pdfData.text;


        // Send extracted text to Gemini API
        const prompt = `Generate a multiple-choice quiz based on the following text:
        ${pdfText}. const prompt = Extract key concepts from this text and create a multiple-choice quiz with four options per question. Format the output as:
1. Question?
a. Option 1
b. Option 2
c. Option 3
d. Option 4
Answer: a`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { params: { key: process.env.GEMINI_API_KEY } }
        );


        // Extract MCQs from Gemini's response
        const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const questions = extractMCQs(generatedText);

        res.json({ questions });

        // Clean up uploaded file
        fs.unlinkSync(pdfPath);
    } catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).json({ error: 'Failed to generate quiz' });
    }
});

// Function to extract MCQs from Gemini's response
function extractMCQs(responseText) {
    const questions = [];
    const regex = /(\d+\..*?)\n(a\..*?)\n(b\..*?)\n(c\..*?)\n(d\..*?)\nAnswer:\s*(\w)/gs;

    let match;
    while ((match = regex.exec(responseText)) !== null) {
        questions.push({
            question: match[1],
            options: [match[2], match[3], match[4], match[5]],
            correctAnswer: match[6],
        });
    }
    return questions;
}

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
