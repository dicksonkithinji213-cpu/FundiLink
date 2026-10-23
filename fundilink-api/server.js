const express = require("express");
const app = express();
const port = 3004;

const path = require("path");

app.use(express.static(path.join(__dirname, "..")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const providers = [
    { id: 1, name: "John Kamau", service: "Plumbing", location: "kahawa" },
    { id: 2, name: "Jane Mutiso", service: "Electrical", location: "langata" },
    { id: 3, name: "Mike Kithinji", service: "Carpentry", location: "kawangware" },
];

app.get("/api/providers", (req, res) => {
    res.json(providers);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});