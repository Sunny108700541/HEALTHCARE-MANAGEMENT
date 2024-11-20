// controllers/LabController.js
const LabResult = require('../models/labresult');

// Create a new lab result
exports.createLabResult = async (req, res) => {
    try {
        const { patientId, filePath, fileType } = req.body;
        const newLabResult = new LabResult({ patientId, filePath, fileType });

        await newLabResult.save();
        res.status(201).json({ message: 'Lab result uploaded successfully!', newLabResult });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading lab result', error: error.message });
    }
};

// Get lab results for a patient
exports.getLabResultsByPatient = async (req, res) => {
    try {
        const labResults = await LabResult.find({ patientId: req.params.patientId });
        res.status(200).json(labResults);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lab results', error: error.message });
    }
};
