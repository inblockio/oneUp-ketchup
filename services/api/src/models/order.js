const uuid = require('uuid');
const mongoose = require('../databases/mongo');

const OrderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  state: {
    type: String,
    enum: ['placed', 'executing', 'completed'],
    required: true,
  },
  sourceAddress: {
    type: String,
  },
  destinationAddress: {
    type: String,
  },
  amount: {
    type: Number,
  },
  price: {
    type: Number,
  },
  carrierAddress: {
    type: String,
  },
});

module.exports = mongoose.model('Order', OrderSchema);