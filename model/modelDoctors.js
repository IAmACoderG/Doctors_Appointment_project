import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    specialty:
    {
        type: String,
        required: true
    },
    maxPatients:
    {
        type: Number,
        required: true
    },
    practiceDays:
    {
        type: String,
        required: true
    },
    appointments:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }]
}, { timestamps: true })

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;