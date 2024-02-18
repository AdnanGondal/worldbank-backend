const express = require("express");
const cors = require("cors");
const users = require("./src/routes/users.route");
const sessions = require("./src/routes/sessions.route");
const countries = require("./src/routes/countries.route");
const indicators = require("./src/routes/indicators.route");
const cookieParser = require("cookie-parser");

const {
	errorLogger,
	errorHandler,
	invalidPathHandler,
} = require("./src/middleware/errorHandling");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const PORT = process.env.PORT || 8080;
const ORIGIN = process.env.URL || "http://localhost:5000";
console.log(`origin is ${ORIGIN}`);

const app = express();

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get("/api", (req, res) => {
	res.json({ message: "API is active" });
});

app.use("/api/users", users);
app.use("/api/sessions", sessions);
app.use("/api/countries", countries);
app.use("/api/indicators", indicators);

app.use(errorLogger);
app.use(errorHandler);
app.use(invalidPathHandler);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
