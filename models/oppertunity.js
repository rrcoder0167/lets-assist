import mongoose, { Schema, models } from "mongoose";

const oppertunitySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Oppertunity = models.Oppertunity || mongoose.model("Oppertunity", oppertunitySchema);
export default Oppertunity;