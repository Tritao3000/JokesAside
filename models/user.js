import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already has an account"],
    required: [true, "Email is necessary"],
  },
  username: {
    type: String,
    required: [true, "Email is necessary"],
    match: [
      /^(?=.{8,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username is invalid, it should contain 8-20 alphanumeric characters and be unique",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
