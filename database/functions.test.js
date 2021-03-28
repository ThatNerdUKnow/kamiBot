const { newVip, updateVipList } = require("./vipFunctions");
const mongoose = require("mongoose");
const { Vip } = require("./schemas/vipSchema");
const { User } = require("./schemas/userSchema");

describe("Vip Functions", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    //var vip = new Vip({ user: new mongoose.Types.ObjectId() });
    //await vip.save();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("newVip", async () => {
    var user = await User.findOne();
    await Vip.deleteOne({ user: user._id });
    var testVip = await newVip(user._id);
    expect(testVip instanceof Vip).toBe(true);
  });

  test("updateVipList", async () => {
    var res = await updateVipList();
    expect(res instanceof Array).toBe(true);
  });
});
