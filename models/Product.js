import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  storeName: String,
  price: Number,
  foodgroup: String,
  perishable: Boolean,
  badges: [String],
  thumbnail: String,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
