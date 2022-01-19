import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  await dbConnect();

  const products = await Product.find({});
  res.send(products);
});

export default handler;
