import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  name: String,
  slug: String,
  details: String,
  badges: [String],
  thumbnail: String,
});

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);
