import mongoose, { Schema, models, model } from "mongoose";

const PromtSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        required: [true, "Please enter a prompt"]
    },
    tag: {
        type: String,
        required: [true, "Please enter a tag"]
    },
})

const Prompt = models.Prompt || model("Prompt", PromtSchema);

export default Prompt;