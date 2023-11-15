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

const Opportunity = models.Oppertunity || mongoose.model("Opportunity", oppertunitySchema);
export default Opportunity;