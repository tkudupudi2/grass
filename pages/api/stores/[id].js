import dbConnect from "../../../lib/dbConnect";
import Store from "../../../models/Store";
import Storefront from "../../stores/[id]";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const store = await Store.findOne({ name: id });
        if (!Storefront) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: store });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const store = await Store.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!store) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: store });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedStore = await Store.deleteOne({ _id: id });
        if (!deletedStore) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
