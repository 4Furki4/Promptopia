import { Schema, models, model } from "mongoose";
import { tagSchema } from "./tag";

const PromtSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        required: [true, "Please enter a prompt"]
    },
    tags: {
        type: [tagSchema],
        default: undefined
    }
})

const Prompt = models.Prompt || model("Prompt", PromtSchema);
export default Prompt;