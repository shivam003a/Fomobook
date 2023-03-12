const mongoose = require("mongoose");

const URL = process.env.URL;
const connectDB = () => {
	return mongoose.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;