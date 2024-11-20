// controllers/PrescriptionController.js
const Prescription = require('../models/prescription');

// Create a new prescription
exports.createPrescription = async (req, res) => {
    try {
        const newPrescription = new Prescription(req.body);
        await newPrescription.save();
        res.status(201).json({ message: 'Prescription created successfully!', newPrescription });
    } catch (error) {
        res.status(500).json({ message: 'Error creating prescription', error: error.message });
    }
};

// Get all prescriptions for a patient
exports.getPrescriptionsByPatient = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patientId: req.params.patientId });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
    }
};

// Update a prescription
exports.updatePrescription = async (req, res) => {
    try {
        const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Prescription updated successfully!', updatedPrescription });
    } catch (error) {
        res.status(500).json({ message: 'Error updating prescription', error: error.message });
    }
};

// Delete a prescription
exports.deletePrescription = async (req, res) => {
    try {
        await Prescription.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Prescription deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting prescription', error: error.message });
    }
};
