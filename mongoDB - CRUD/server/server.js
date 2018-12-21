const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('../server/models/user');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(e => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(data => {
      res.send({ data });
    })
    .catch(e => res.status(400).send(e));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send();
      }
      res.send({ data });
    })
    .catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        return res.status(404).send();
      }
      res.status(200).send({ data });
    })
    .catch(e => res.status(400).send());
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = { app };