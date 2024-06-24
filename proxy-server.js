const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/proxy', (req, res) => {
    const apiUrl = req.url.replace('/proxy/', '');  // Verwijder het /proxy/ gedeelte van de URL
    const fullUrl = `https://api-web.nhle.com${apiUrl}`;
    
    console.log(`Proxying request to: ${fullUrl}`);  // Debugging regel
    
    req.pipe(request(fullUrl)).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
