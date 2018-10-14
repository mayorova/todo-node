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

const Todo = require('./models').Todo;

api.get('/todos', function(req, res) {
  return Todo
    .all()
    .then(todos => res.status(200).send(todos))
    .catch(error => res.status(400).send(error));
});

api.get('/todos/:id', function(req, res) {
  return Todo
    .findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          error: 'ToDo Not Found',
        });
      }
      return res.status(200).send(todo);
    })
    .catch(error => res.status(400).send(error));
});

api.post('/todos', jsonParser, function(req, res) {
   return Todo
     .create({
       title: req.body.title,
       description: req.body.description
     })
     .then(todo => res.status(201).send(todo))
     .catch(error => res.status(400).send(error));
});

api.put('/todos/:id', jsonParser, function(req, res) {
  return Todo
    .findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          error: 'ToDo Not Found',
        });
      }
      return todo
        .update({
          title: req.body.title || todo.title,
          description: req.body.description || todo.description
        })
        .then(() => res.status(200).send(todo))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
});

api.delete('todos/:id', function(req, res) {
  res.sendStatus(200);
});

app.listen(port, ip, function () {
  console.log('Echo API is listening on port ' + port + ' in env ' + process.env.NODE_ENV);
});

module.exports = app;
