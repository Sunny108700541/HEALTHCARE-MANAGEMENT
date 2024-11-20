const Tesseract = require('tesseract.js');
const extractTextFromImage = require('../utils/ocrService');
const path = require('path');

const processImageForOCR = async (req, res) => {
    try {
        // Log the received file and its path
        console.log('Received file:', req.file); // Log the uploaded file details

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Construct the path to the uploaded image
        const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        console.log('Image path:', imagePath); // Log the image path

        // Verify if the file exists (optional but useful for debugging)
        const fs = require('fs');
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('File does not exist:', imagePath);
                return res.status(400).json({ success: false, message: 'Uploaded file does not exist' });
            }
            console.log('File exists:', imagePath);
        });

        // Call the function to extract text from the image using OCR
        const extractedText = await extractTextFromImage(imagePath);
        console.log('Extracted text:', extractedText); // Log the extracted text

        res.json({ success: true, extractedText });
    } catch (error) {
        console.error('Error processing OCR:', error); // Log any error during OCR processing
        res.status(500).json({ success: false, message: 'Failed to process image' });
    }
};

module.exports = { processImageForOCR };
