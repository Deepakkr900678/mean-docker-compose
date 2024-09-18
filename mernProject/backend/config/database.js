const mongoose = require("mongoose");
require("dotenv").config();

const URI = "mongodb://localhost:27017"
exports.connect = () => {
	mongoose.connect(URI, {
		useNewUrlparser: true,
		useUnifiedTopology: true,
	})
		.then(console.log("DB Connection Successfully"))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
