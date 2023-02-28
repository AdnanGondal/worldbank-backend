const express = require("express");
const cors = require("cors");
const users = require("./src/routes/users.route")
const { errorLogger,errorHandler, invalidPathHandler } = require("./src/middleware/errorHandling");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const PORT = process.env.PORT || 8080;
const ORIGIN = process.env.URL || "http://localhost:5000";
console.log(ORIGIN);

const app = express();

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get("/api/", (req, res) => {
	res.json({ message: "API is active" });
});

app.use("/api/users", users);

app.use(errorLogger);
app.use(errorHandler);
app.use(invalidPathHandler);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
