import mongoose from "mongoose";

const PantrySchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    items: [
      {
        name: String,
        thumbnail: String,
        quantity: Number,
        foodgroup: String,
        perishable: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pantry || mongoose.model("Pantry", PantrySchema);
