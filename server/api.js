const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let customers = [];
let customerIdCounter = 1;

app.get("/api/customers", (req, res) => {
	res.json(customers);
});

app.post("/api/customers", (req, res) => {
	try {
		const consolidatedData = req.body;

		const customerId = customerIdCounter++;

		const customerWithId = { id: customerId, ...consolidatedData };

		customers.push(customerWithId);

		console.log("Data saved successfully");

		res.status(201).json(customerWithId);
	} catch (error) {
		console.error("Error processing the data:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
