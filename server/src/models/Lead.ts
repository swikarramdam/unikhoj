import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  fullName: string;
  phone: string;
  email?: string;
  degree: "bachelors" | "masters";
  gpa: string;
  testType: "ielts" | "pte" | "toefl" | "none";
  testScore?: string;
  country: string;
  budget: string;
  createdAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    degree: {
      type: String,
      enum: ["bachelors", "masters"],
      required: true,
    },
    gpa: { type: String, required: true, trim: true },
    testType: {
      type: String,
      enum: ["ielts", "pte", "toefl", "none"],
      default: "ielts",
    },
    testScore: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    budget: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILead>("Lead", leadSchema);
