const mongoose = require('../databases/mongo');

const Vehicle = new mongoose.Schema({
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
		}
	}
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

