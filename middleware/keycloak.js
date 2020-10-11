// Keycloak integration
var session = require('express-session');
var Keycloak = require('keycloak-connect');

const env = process.env.NODE_ENV || 'development';
const keycloakConfigFile = __dirname + '/../config/keycloak.json';

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore }, keycloakConfigFile);

// module.exports = keycloak;

// Disable Keycloak
module.exports = {
  middleware: () => {
    return (req, res, next) => next();
  },
  protect: () => {
    return (req, res, next)  => next();
  }
};
