var express = require('express');
var bodyParser = require('body-parser')

var app = express();

var port = parseInt(process.env.PORT, 10) || 3000,
    ip   = process.env.IP   || '0.0.0.0';

// Register the API router under /api/v1/
var api = express.Router();
app.use('/api/v1/', api);

// application/json parser
var jsonParser = bodyParser.json()

var dummyData = [
  {
    id: 1,
    title: 'The first ToDo',
    description: 'This is the very first ToDo in this app.'
  },
  {
    id: 2,
    title: 'Add more features',
    description: 'Add more features to this app.'
  }
];

api.get('/todos', function(req, res) {
  res.json(dummyData);
});

api.get('/todos/:id', function(req, res) {
  res.json(dummyData[0]);
});

api.post('/todos', jsonParser, function(req, res) {
  res.json(req.body);
});

api.put('/todos/:id', jsonParser, function(req, res) {
  res.json(req.body);
});

api.delete('todos/:id', function(req, res) {
  res.sendStatus(200);
});

app.listen(port, ip, function () {
  console.log('Echo API is listening on port ' + port + ' in env ' + process.env.NODE_ENV);
});

module.exports = app;
