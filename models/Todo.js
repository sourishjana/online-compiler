const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    content: {
        type: String
    },
    completed:{
        type: Boolean,
        default:false
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Todo =mongoose.model('todo', TodoSchema)

