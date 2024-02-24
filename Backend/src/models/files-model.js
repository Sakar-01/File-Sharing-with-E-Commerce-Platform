import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    src: { type: String, required: true },
    uploadedBy: { type: String, required: true },
    isPrivate: { type: Boolean },
  });

export default mongoose.model("File", fileSchema);