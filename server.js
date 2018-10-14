var express = require('express');

var app = express();

var port = parseInt(process.env.PORT, 10) || 3000,
    ip   = process.env.IP   || '0.0.0.0';

// Register the API routes under /api/v1/
app.use('/api/v1/', require('./routes/api_v1'));

app.listen(port, ip, function () {
  console.log('Echo API is listening on port ' + port + ' in env ' + process.env.NODE_ENV);
});

module.exports = app;
