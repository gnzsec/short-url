import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    shortCode: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accessCount: { type: Number, default: 0 }
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
