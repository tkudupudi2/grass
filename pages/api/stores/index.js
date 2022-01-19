import dbConnect from "../../../lib/dbConnect";
import Store from "../../../models/Store";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const Stores = await Store.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: Stores });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const addedStore = await Store.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: addedStore });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
