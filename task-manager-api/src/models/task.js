const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type: Buffer,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: {
        type: Array,
        default: []
    }
       
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task