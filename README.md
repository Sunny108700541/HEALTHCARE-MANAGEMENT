# HEALTHCARE-MANAGEMENT
# Healthcare Management System 🏥

## Project Overview
The **Healthcare Management System** is a web application designed to simplify and streamline medical record management. It provides features for patient profile management, appointment scheduling, medical history tracking, and secure communication between patients and doctors.

---

## Features 🚀
1. **Patient Management**:
   - Add and view patient details.
   - Display patient ID and doctor's ID on profile pages.
   - Dynamically fetch and display patient data using session storage.

2. **Appointment Scheduling**:
   - Book and track appointments.

3. **Medical Records**:
   - Manage patient medical history and lab results.
   - Prescription tracking and integration.

4. **Secure Communication**:
   - Messaging between healthcare providers and patients.

5. **Reporting and Analytics**:
   - Generate reports for better decision-making.

---

## Tech Stack 🛠️
- **Frontend**:
  - HTML, CSS, JavaScript.
  - Responsive design for user-friendly UI.

- **Backend**:
  - Node.js with Express.js.
  - Mongoose (for database schema and model management).

- **Database**:
  - MongoDB for storing patient, doctor, and appointment data.

- **Other Tools**:
  - Session storage for dynamic patient ID handling.
  - Integration with external APIs (e.g., for lab results).

---

## Project Structure 📂
```plaintext
storage/
├── public/
│   ├── index.html       # Registration and login page
│   ├── profile.html     # Patient profile page
│   ├── script.js        # Frontend JavaScript logic
├── app.js               # Main server file
├── UserController.js    # Handles user-related backend functionalities
├── models/
│   ├── userSchema.js    # Mongoose schema for users
├── package.json         # Node.js dependencies
