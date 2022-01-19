import dbConnect from "../../../lib/dbConnect";
import Pantry from "../../../models/Pantry";
import nc from "next-connect";
import User from "../../../models/User";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await dbConnect();
    const pantry = await Pantry.findOne({ email: req.query.email });
    res.status(200).json(pantry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

handler.post(async (req, res) => {
  try {
    await dbConnect();
    const cartItems = req.body.cartItems;
    const email = req.body.email;
    for (var i = 0; i < cartItems.length; i++) {
      const cartItem = {
        name: cartItems[i].name,
        thumbnail: cartItems[i].thumbnail,
        quantity: cartItems[i].quantity,
        foodgroup: cartItems[i].foodgroup,
        perishable: cartItems[i].perishable,
      };
      console.log(email);
      console.log(cartItem);
      await Pantry.updateOne({ email: email }, { $push: { items: cartItem } });
    }

    res.status(200).json();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

export default handler;
