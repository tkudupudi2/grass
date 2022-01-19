import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  await dbConnect();

  const product = await Product.findOne({ slug: req.query.id });
  res.send(product);
});

export default handler;
