const mongoose = require("mongoose");
const { Schema } = mongoose;

const vipSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User",unique: true },
});

const Vip = mongoose.model("Vip", vipSchema);

module.exports = { vipSchema, Vip };
