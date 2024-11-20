// controllers/AppointmentController.js
const Appointment = require('../models/appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, time } = req.body;
        const newAppointment = new Appointment({
            patientId,
            doctorId,
            date,
            time,
            status: 'Scheduled',
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully!', newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
};

// Get all appointments for a patient
exports.getAppointmentsByPatient = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.patientId });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Appointment updated successfully!', updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment', error: error.message });
    }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Appointment canceled successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling appointment', error: error.message });
    }
};
