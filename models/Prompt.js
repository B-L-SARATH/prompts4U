import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Please provide a prompt"],
  },
  tag: {
    type: String,
    required: [true, "Please provide a tag"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Prompt || model("Prompt", PromptSchema);
