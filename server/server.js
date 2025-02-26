const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let spreadsheetData = {}; // Temporary in-memory storage

app.post('/save', (req, res) => {
  spreadsheetData = req.body;
  res.send({ message: 'Data saved successfully!' });
});

app.get('/load', (req, res) => {
  res.json(spreadsheetData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
