const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, default: "debater" },
    isVerified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword=async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if(!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
}) 

const User = mongoose.model("User", userSchema);

module.exports = User;