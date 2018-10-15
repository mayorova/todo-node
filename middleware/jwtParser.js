// This middleware extracts the Bearer token from the Authorization header,
// parses the JWT token and places the result in the 'jwt' attribute of the
// request object 'req'. It also saves the 'preferred_username' JWT claim as
// 'req.username'.

var jwt = require('jsonwebtoken');

// for more options the following middleware can be used:
// https://github.com/tkellen/js-express-bearer-token
module.exports = function(){
  return function (req, res, next) {
    var token;
    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }
    if (token) {
      req.jwt = jwt.decode(token) || {};
      req.jwtUsername = req.jwt.preferred_username;
    }
    next();
  };
}
