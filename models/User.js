import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "Please provide an email"],
  },
  image: {
    type: String,
  },
});

export default models.User || model("User", UserSchema);
