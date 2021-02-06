const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    p1:{
        user: String,
        points: Number
    },
    p2:{
        user: String,
        points: Number
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Game', gameSchema)