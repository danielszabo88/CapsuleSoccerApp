const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 15
    },
    password: {
        type: String,
        required: true
    },
    stats: {
        gamesPlayed: {
            type: Number,
            default: 0
        },
        gamesWon: {
            type: Number,
            default: 0
        },
        pointsFor: {
            type: Number,
            default: 0
        },
        pointsAgainst: {
            type: Number,
            default: 0
        },
        lastOpponent: String,
        lastGame: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)