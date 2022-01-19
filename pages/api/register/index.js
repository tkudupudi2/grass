import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import nc from "next-connect";
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth';

const handler = nc();

handler.post(async (req, res) => {
  await dbConnect();

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(401).send({ message: 'Email is already in use' });
  } else {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        zipcode: req.body.zipcode,
        password: bcrypt.hashSync(req.body.password),
        isAdmin: false,
    });
    const user = await newUser.save();

    const token = signToken(user);
    res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        zipcode: user.zipcode,
        isAdmin: user.isAdmin,
    });
  }
});

export default handler;