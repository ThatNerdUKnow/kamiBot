const userSchema = require("./userSchema.js")
const mongoose = require("mongoose")

const User = mongoose.model("User",userSchema)

test("Interaction score validation",()=>{
    
    const User = mongoose.model("User",userSchema)

    var testUser = new User({uName:"TestUser"})
    testUser.messagesSent = 25;
    testUser.timeWatched = 25;
    testUser.validateSync()
    expect(testUser.interactionScore).toBe(50)
})

test("Able to get id of document?",()=>{
    var testUser = new User({uName:"TestUser"})
    testUser.validateSync()
    expect(mongoose.isValidObjectId(testUser._id)).toBe(true)
})