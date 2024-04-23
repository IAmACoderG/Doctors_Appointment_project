import { Router } from "express";
import Doctor from "../model/modelDoctors.js";
import Appointment from "../model/modelAppointment.js";
const router = Router();

//router Added Doctors;
router.post("/docAdd", async (req, res) => {
    try {
        const AddedDoc = await Doctor.create(req.body);
        console.log(req.body);
        if (!AddedDoc) return res.status(402).json({
            success: false,
            message: "Error while Added Doc"
        })
        return res.status(200).json({
            success: true,
            message: "Added Doc SuccessFully",
            AddedDoc
        })

    } catch (error) {
        throw new Error(500, "internal Server Error")
    }
})

//All Doctors
router.get('/allDoc', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        if (!doctors) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json({ doctors });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
});

// routes/doctors.js
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json({ doctor });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
});

// routes/availability.js
router.get('/:id/availability', async (req, res) => {
    const { date } = req.query;
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        // Get day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const dayOfWeek = new Date(date).getDay();
        // Check if it's a weekday (Monday to Friday)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return res.json({ available: false, message: 'Doctor does not practice on weekends' });
        }
        // Check if maximum patients limit is reached for the day
        const appointmentsForDate = await Appointment.find({ doctor: doctor._id, date });
        if (appointmentsForDate.length >= doctor.maxPatients) {
            return res.json({ available: false, message: 'No available slots for this date' });
        }
        res.json({ available: true, message: 'Available slots for this date' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// routes/appointments.js
router.post('/:id/book', async (req, res) => {
    const { date, time } = req.body;
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        // Check if appointment slot is available
        const isAvailable = await isAppointmentAvailable(doctor._id, date, time);
        if (!isAvailable) {
            return res.status(400).json({ error: 'Appointment slot not available' });
        }
        // Book appointment
        const appointment = new Appointment({
            doctor: doctor._id,
            date,
            time
        });
        await appointment.save();
        res.json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to check if appointment slot is available
async function isAppointmentAvailable(doctorId, date, time) {
    const existingAppointment = await Appointment.findOne({ doctor: doctorId, date, time });
    return !existingAppointment;
}


export default router;