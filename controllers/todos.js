// ToDo controller
const Todo = require('../models').Todo;
const User = require('../models').User;

const todosCtrl = {
  list(req, res) {
    var username = req.jwtUsername;
    return User.findOne({ where: { username: username}})
      .then(user => {
        return Todo
          // Only get ToDos of the authenticated user
          .findAll({ where: { userId: user.id }})
          .then(todo => res.status(201).send(todo))
      })
      .catch(error => res.status(400).send(error));
  },
  read(req, res) {
    var username = req.jwtUsername;
    return Todo
      .findById(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            error: 'ToDo Not Found',
          });
        }
        return User.findOne({ where: { username: username}})
          .then(user => {
            // Deny access to ToDos of other users
            if (todo.userId != user.id) {
              return res.status(403).send({
                error: 'Access Denied',
              });
            }
            return res.status(200).send(todo);
          })

      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    var username = req.jwtUsername;
    return User.findOne({ where: { username: username}})
      .then(user => {
        return Todo.create({
          title: req.body.title,
          description: req.body.description,
          done: false,
          userId: user.id
        })
        .then(todo => res.status(201).send(todo))
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    // TODO: validate required inputs

    var username = req.jwtUsername;
    return Todo
      .findById(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            error: 'ToDo Not Found',
          });
        }
        return User.findOne({ where: { username: username}})
          .then(user => {
            // Deny access to ToDos of other users
            if (todo.userId != user.id) {
              return res.status(403).send({
                error: 'Access Denied',
              });
            }
            return todo
              .update({
                title: req.body.title,
                description: req.body.description,
                done: req.body.done
              })
              .then((todo) => res.status(200).send(todo));
          })
      })
      .catch((error) => res.status(400).send(error));
  },
  patch(req, res) {
    // TODO: validate required inputs

    var username = req.jwtUsername;

    // When patching, just update the provided field
    var fields = ['title', 'description', 'done'];
    var params = Object.keys(req.body);
    var fieldsToUpdate = params.filter(p => fields.includes(p));
    var updateObject = {};
    fieldsToUpdate.forEach(f => updateObject[f] = req.body[f])

    return Todo
      .findById(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            error: 'ToDo Not Found',
          });
        }
        return User.findOne({ where: { username: username}})
          .then(user => {
            // Deny access to ToDos of other users
            if (todo.userId != user.id) {
              return res.status(403).send({
                error: 'Access Denied',
              });
            }
            return todo
              .update(updateObject, { fields: fieldsToUpdate })
              .then((todo) => res.status(200).send(todo));
          })
      })
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    var username = req.jwtUsername;
    return Todo
      .findById(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            error: 'ToDo Not Found',
          });
        }
        return User.findOne({ where: { username: username}})
          .then(user => {
            // Deny access to ToDos of other users
            if (todo.userId != user.id) {
              return res.status(403).send({
                error: 'Access Denied',
              });
            }
            return todo
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
      })
      .catch(error => res.status(400).send(error));
  },
};

module.exports = todosCtrl;
