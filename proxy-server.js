const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/https://api-web.nhle.com', (req, res) => {
    const apiUrl = req.url;  // Dit zal het pad en de query parameters vastleggen
    const fullUrl = `https://api-web.nhle.com${apiUrl}`;
    
    console.log(`Proxying request to: ${fullUrl}`);  // Debugging regel
    
    req.pipe(request(fullUrl)).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
