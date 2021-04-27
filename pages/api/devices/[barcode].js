import Device from '../../../models/Device';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const devices = await Device.findOne({ barcode: req.query.barcode });

        res.status(200).json({ success: true, data: devices });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const devices = await Device.findOneAndUpdate({ barcode: req.query.barcode }, req.body);

        res.status(201).json({ success: true, data: devices });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const devices = await Device.findByIdAndDelete(req.body._id);

        res.status(200).json({ success: true, data: devices });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
