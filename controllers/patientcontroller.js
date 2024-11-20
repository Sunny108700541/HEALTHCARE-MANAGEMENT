// controllers/PatientController.js
const Patient = require('../models/patient');

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: 'Patient created successfully!', newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error creating patient', error: error.message });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
};

// Update patient details
exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Patient updated successfully!', updatedPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Patient deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting patient', error: error.message });
    }
};
