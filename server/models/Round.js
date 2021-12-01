const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const roundSchema = new Schema({

        roundNumber: {
            type: Number,
            required: true,
        },
        battletactic:{
            type: String,
        },
        btcomplete:{
            type: Boolean,
        },
        heroicaction:{
            type: String,
            required: true,
        },
        victorypoints:{
            type: Number,
            required: true,
        }

});

// const Round = mongoose.model('Round', roundSchema);

module.exports = roundSchema;