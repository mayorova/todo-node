const router = require('express').Router();
const bodyParser = require('body-parser')

// application/json parser
var jsonParser = bodyParser.json()

const todosCtrl = require('../controllers/todos');

const keycloak = require('../middleware/keycloak');
const jwtParser = require('../middleware/jwtParser');

router.get('/todos', keycloak.protect(), jwtParser(), todosCtrl.list);

router.get('/todos/:id', keycloak.protect(), jwtParser(), todosCtrl.read);

router.post('/todos', keycloak.protect(), jwtParser(), jsonParser, todosCtrl.create);

router.put('/todos/:id', keycloak.protect(), jwtParser(), jsonParser, todosCtrl.update);

router.delete('/todos/:id', keycloak.protect(), jwtParser(), todosCtrl.delete);

module.exports = router
