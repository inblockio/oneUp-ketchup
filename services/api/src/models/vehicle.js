const uuid = require('uuid');
const mongoose = require('../databases/mongo');

const VehicleSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  vehicleType: {
    type: String,
    enum: ['ready', 'loading', 'unloading', 'maintenance'],
    required: true,
  },
  capacity: {
    type: Number,
  },
  positionX: {
    type: Number,
  },
  positionY: {
    type: Number,
  },
  speed: {
    type: Number,
  },
  rottenImprovement: {
    type: Number,
  },
  reach: {
    type: Number,
  },
  readyPositionX: {
    type: Number,
  },
  readyPositionY: {
    type: Number,
  },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);