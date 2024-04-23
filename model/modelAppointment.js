import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctor:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date:
    {
        type: Date,
        required: true
    },
    time:
    {
        type: String,
        required: true
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;