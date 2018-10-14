// ToDo controller
const Todo = require('../models').Todo;

const todosCtrl = {
  list(req, res) {
    return Todo
      .all()
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
  read(req, res) {
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
  },
  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
        description: req.body.description
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
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
  }
};

module.exports = todosCtrl;
