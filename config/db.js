const mongoose = require('mongoose');
const config = require('config');

const db = process.env.mongoURI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('MongoDB connected!');
	} catch (e) {
		console.error(e.message);
		process.exit(1);
	}
};

module.exports = connectDB;
