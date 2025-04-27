import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String, // or ObjectId with ref if you're using a separate Category model
        required: true
    },

    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

export default Event