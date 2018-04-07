const mongoose = require('../databases/mongo');

const Storage = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  capacity: {
    type: Number,
    required: true,
  },
	position: {
		x: {
			type: Numnber,
			required: true,
		},
		y: {
			type: Number,
			required: true,
		},
	},
  store: {
    type: [Crop],
    default: [],
  },
});

module.exports = mongoose.model('Storage', StorageSchema);

