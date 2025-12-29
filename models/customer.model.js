import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const customerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      select: false,
    },

    googleId: String,

    name: String,

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hash password
customerSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password
customerSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

// Generate reset token
customerSchema.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return token;
};

export default mongoose.model("Customer", customerSchema);
