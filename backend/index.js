const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello from the backend.");
});

app.get('/fetchAPI', async (req, res) => {
    const {endpoint, headers} = req.query;


    const response = await axios.get(endpoint, {headers: headers});
    res.json(response.data);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});