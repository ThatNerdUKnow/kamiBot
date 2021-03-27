const userSchema = require("./userSchema.js");
const { vipSchema, Vip } = require("./vipSchema");
const mongoose = require("mongoose");

const User = mongoose.model("User", userSchema);

describe("User Tests", () => {
  test("Interaction score validation", () => {
    const User = mongoose.model("User", userSchema);

    var testUser = new User({ uName: "TestUser" });
    testUser.messagesSent = 25;
    testUser.timeWatched = 25;
    testUser.validateSync();
    expect(testUser.interactionScore).toBe(50);
  });

  test("Able to get id of document?", () => {
    var testUser = new User({ uName: "TestUser" });
    testUser.validateSync();
    expect(mongoose.isValidObjectId(testUser._id)).toBe(true);
  });
});

describe("VIP Tests", () => {
  beforeEach(async () => {
    await mongoose.connect("mongodb://localhost/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    //
    Vip.collection.drop();
  });
  test("Get details of VIP from objectId", async () => {
    origUser = await User.findOne();
    var testVip = new Vip({ user: origUser._id });
    await testVip.save();

    testVip = await Vip.findOne().populate("user");

    //origuser = await User.findById(origUser._id)

    expect(JSON.stringify(testVip.user)).toBe(JSON.stringify(origUser));
  });
});
