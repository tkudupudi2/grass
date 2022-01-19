import dbConnect from "../../lib/dbConnect";
import Product from "../../models/Product";
import nc from "next-connect";
import data from "../../lib/data";
import User from "../../models/User";
import Pantry from "../../models/Pantry";

const handler = nc();

handler.get(async (req, res) => {
  await dbConnect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await Pantry.deleteMany();
  await Pantry.insertMany(data.pantry);
  res.send({ message: "Seeded successfully." });
});

export default handler;
