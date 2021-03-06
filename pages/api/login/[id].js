import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import nc from "next-connect";
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth';

const handler = nc();

handler.post(async (req, res) => {
  await dbConnect();

  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

export default handler;
