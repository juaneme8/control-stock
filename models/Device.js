import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  barcode: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  line: { type: String, required: false },
  manufacturer: { type: String, required: false },
  location: { type: String, required: false },
  estado: { type: String, enum: ['rojo', 'amarillo', 'verde'] },
});

export default mongoose.models.Device || mongoose.model('Device', DeviceSchema);
