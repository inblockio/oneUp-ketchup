const uuid = require('uuid');
const mongoose = require('../databases/mongo');

const StorageSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  storageType: {
    type: String,
    enum: ['farm', 'coop', 'city'],
    required: true,
  },
  capacity: {
    type: Number,
  },
  position: {
		x: {
			type: Number,
			required: true,
		},
		y: {
			type: Number,
			required: true,
		},
	},
  rottingFactor: {
    type: Number,
  },
  stock: {
    type: Number,
  },
});

module.exports = mongoose.model('Storage', StorageSchema);
