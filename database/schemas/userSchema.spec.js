const userSchema = require("./userSchema.js")
const mongoose = require("mongoose")

test("Test interaction score validation",()=>{
    
    const User = mongoose.model("User",userSchema)

    var testUser = new User({uName:"TestUser"})
    testUser.messagesSent = 25;
    testUser.timeWatched = 25;
    testUser.validateSync()
    console.log(testUser)
    expect(testUser.interactionScore).toBe(50)
})