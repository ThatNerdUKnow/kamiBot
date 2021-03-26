const mongoose = require("mongoose");
const userSchema = require("./schemas/userSchema.js");
require("dotenv").config();

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((connection, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected to database");
    }
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
