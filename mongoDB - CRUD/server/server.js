require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('../server/models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// POST /todos
app.post('/todos', authenticate, async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  try {
    const data = await todo.save();
    res.send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /todos
app.get('/todos', authenticate, async (req, res) => {
  try {
    const data = await Todo.find({
      _creator: req.user._id
    });
    res.send({ data });
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /todos/:id
app.get('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const data = await Todo.findOne({
      _id: id,
      _creator: req.user._id
    });
    if (!data) {
      return res.status(404).send();
    }
    res.send({ data });
  } catch (e) {
    res.status(400).send();
  }
});

// DELETE /todos/:id
app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const data = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
    if (!data) {
      return res.status(404).send();
    }
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send();
  }
});

// PATCH /todos/:id
app.patch('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  try {
    const data = await Todo.findOneAndUpdate(
      { _id: id, _creator: request.user._id },
      { $set: body },
      { new: true }
    );
    if (!data) {
      res.status(404).send();
    }
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send();
  }
});

// POST /users
app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login
app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

// DELETE /users/me/token
app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = { app };
