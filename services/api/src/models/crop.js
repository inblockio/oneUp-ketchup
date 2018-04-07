const mongoose = require('../databases/mongo');

const Crop = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rottenRate: {
    type: Number,
    required: true,
    default: 1,
  },
  quality: {
    type: Number,
    required: true,
    default: 100,
  },
});

module.exports = mongoose.model('Crop', CropSchema);


