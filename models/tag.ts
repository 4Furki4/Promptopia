import { Schema, models, model } from "mongoose";

const tagSchema = new Schema({
    tag: {
        type: String,
        required: [true, "Please enter a tag"]
    }
})
const Tag = models.Tag || model("Tag", tagSchema);

export { Tag, tagSchema };