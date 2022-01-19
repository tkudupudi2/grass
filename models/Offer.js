import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  condition: String,
  offerzip: Number,
  comment: String,
  thumbnail: String,
})

export default mongoose.models.Offer || mongoose.model("Offer", OfferSchema);
