const router = require('express').Router();
const bodyParser = require('body-parser')

// application/json parser
var jsonParser = bodyParser.json()

const todosCtrl = require('../controllers/todos');

router.get('/todos', todosCtrl.list);

router.get('/todos/:id', todosCtrl.read);

router.post('/todos', jsonParser, todosCtrl.create);

router.put('/todos/:id', jsonParser, todosCtrl.update);

router.delete('todos/:id', function(req, res) {
  res.sendStatus(200);
});

module.exports = router
