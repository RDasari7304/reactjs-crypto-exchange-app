const express = require('express');
const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.send("Hello from the backend.");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});