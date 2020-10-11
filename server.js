const express = require('express');
const session = require('express-session');

const app = express();

const portValue = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT;
const port = parseInt(portValue, 10) || 3000;
const ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';

// Session store
const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'my-super-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}))

const keycloak = require('./middleware/keycloak');
app.use(keycloak.middleware());

// Register the API routes under /api/v1/
app.use('/api/v1/', require('./routes/api_v1'));

app.listen(port, ip, function () {
  console.log('Echo API is listening on port ' + port + ' in env ' + process.env.NODE_ENV);
});

module.exports = app;
