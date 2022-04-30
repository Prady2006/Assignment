const mongoose = require("mongoose");

let options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
mongoose.connect(
	process.env.DB_URL || "mongodb://localhost:27017/server",
	options
);

const db = mongoose.connection;

db.on("error", (err) => {
	console.log('Error connecting to db ',err)
});
db.once("open", (data) => {
	console.log("DATABASE CONNECTION ESTABLISHED");
});

module.exports = {
	db
};