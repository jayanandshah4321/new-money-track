import mongoose from "mongoose";

const manualSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Manual = mongoose.model('Manual', manualSchema);
export default Manual;