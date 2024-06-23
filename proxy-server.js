const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint to bypass CORS
app.use('/https://api-web.nhle.com', (req, res) => {
  const url = 'https://api-web.nhle.com' + req.url;
  req.pipe(request({ qs:req.query, uri: url })).pipe(res);
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
