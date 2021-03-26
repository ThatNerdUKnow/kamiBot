const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uName: { type: String, required: true, unique: true },
    timeWatched: { type: Number, default: 0 },
    messagesSent: { type: Number, default: 0 },
    interactionScore: {
      type: Number,
      validate: interactionScoreValidator,
      default: 0
    },
  },
  { timestamps: true }
);

function interactionScoreValidator() {
  this.interactionScore = this.timeWatched + this.messagesSent;
  return this.interactionScore === this.timeWatched + this.messagesSent;
}

module.exports = userSchema;
