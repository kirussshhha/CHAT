import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  roomKey: {
    type: String,
  },
  username: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
