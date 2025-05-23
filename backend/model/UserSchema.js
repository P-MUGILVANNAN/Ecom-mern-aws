const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // If using Google auth, this can be nullable
  phone: { type: String, default: "" }, // optional
  address: {
    fullName: String,
    phone: String,
    street: String,
    landmark: String,
    city: String,
    state: String,
    zip: String,
    country: { type: String, default: "India" }
  }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
