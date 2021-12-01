const { Schema, model } = require("mongoose");
// const roundSchema = require('./Round');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedgames` array in User.js
const gameSchema = new Schema({
  day: {
    type: Date,
    default: Date.now(),
    required: "date needed",
  },
  name: {
    type: String,
    required: true,
  },
  battleplan: {
    type: String,
    required: true,
  },
  // saved game id from Googlegames
  // gameId: {
  //   type: String,
  //   required: true,
  // },
  army: {
    type: String,
  },
  opponent: {
    type: String,
  },
  opponentarmy: {
    type: String,
  },
  victory: {
    type: Boolean,
    required: true,
  },
  rounds: [
    {
      roundNumber: {
        type: Number,
        required: true,
      },
      battletactic: {
        type: String,
      },
      btcomplete: {
        type: Boolean,
      },
      heroicactiontop: {
        type: String,
        required: true,
      },
      heroicactionbottom: {
        type: String,
        required: true,
      },
      victorypoints: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Game = model("Game", gameSchema);

module.exports = Game;
