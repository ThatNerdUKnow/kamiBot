const { userSchema, User } = require("./schemas/userSchema");
const { vipSchema, Vip } = require("./schemas/vipSchema");
const mongoose = require("mongoose");

function newVip(id) {
  if (mongoose.isValidObjectId(id)) {
    var vip = new Vip({ user: id });
    vip.save();
    return vip;
  }
}

async function updateVipList(callback) {
  return Vip.find();
}

module.exports = { newVip, updateVipList };
