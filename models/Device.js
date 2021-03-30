import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
	name: String,
	line: String,
});

const Device = mongoose.model('device', deviceSchema);

export default Device;
