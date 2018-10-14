const router = require('express').Router();
const bodyParser = require('body-parser')

// application/json parser
var jsonParser = bodyParser.json()

const todosCtrl = require('../controllers/todos');

const keycloak = require('../middleware/keycloak');

router.get('/todos', keycloak.protect(), todosCtrl.list);

router.get('/todos/:id', keycloak.protect(), todosCtrl.read);

router.post('/todos', keycloak.protect(), jsonParser, todosCtrl.create);

router.put('/todos/:id', keycloak.protect(), jsonParser, todosCtrl.update);

router.delete('/todos/:id', keycloak.protect(), todosCtrl.delete);

module.exports = router
