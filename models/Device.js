import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  name: String,
  line: String,
});

export default mongoose.models.Device || mongoose.model('Device', DeviceSchema);
