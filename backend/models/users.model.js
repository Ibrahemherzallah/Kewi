import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10
  },
  address: {
    type: String,
    required: false
  },
  isWholesaler: {
    type: Boolean,
    required: true,
    default: true
  }

},{timestamps: true})


const User = mongoose.modal("User",userSchema);

export default User;