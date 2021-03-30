import dbConnect from '../../../utils/dbConnect';
import Device from '../../../models/Device';

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const devices = await Device.find({});
				res.status(200).json({ success: true, data: devices });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const devices = await Device.create(req.body);
				res.status(201).json({ success: true, data: devices });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
