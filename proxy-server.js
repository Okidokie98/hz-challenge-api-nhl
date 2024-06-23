const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use('/https://api-web.nhle.com', (req, res) => {
    const apiUrl = req.url;  // This will capture the path and query parameters
    const fullUrl = `https://api-web.nhle.com${apiUrl}`;
    
    req.pipe(request(fullUrl)).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
