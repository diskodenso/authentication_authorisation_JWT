// import mongoose
import mongoose, { mongo } from "mongoose";
// declare Schema and model of mongoose
const { Schema, model } = mongoose;

// declare new userSchema by using new keyword
const userSchema = new Schema({
  username: {
    type: String,
    max: 255,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    select: false,
    max: 1024,
    min: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// export new model and schema
export default model("User", userSchema);