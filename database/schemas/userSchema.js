const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uName: {type: String,required: true, unique: true},
    timeWatched: {type: Number, default: 0},
    messagesSent: {type: Number, default: 0},
  },
  { timestamps: true }
);

module.exports = userSchema;