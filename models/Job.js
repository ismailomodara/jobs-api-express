const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'You need to provide a company name'],
        maxlength: 255
    },
    position: {
        type: String,
        required: [true, 'You need to provide a position'],
        maxlength: 255
    },
    status: {
        type: String,
        required: [true, 'You need to provide a status'],
        enum: ['pending', 'interviewing', 'declined'],
        default: 'pending'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'You need to provide user'],
        enum: ['pending', 'interviewing', 'declined'],
        default: 'pending'
    },
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)
