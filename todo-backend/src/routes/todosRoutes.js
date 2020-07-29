const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { SECRET_JWT_KEY } = require('../config/config');

const Todo = mongoose.model('todo');
const User = mongoose.model('user');

const getTodo = async (id, user) => {
  if (!id) {
    throw new Error('ID not found');
  }

  const todo = await Todo.findOne({ _user: user._id, id });

  if (!todo) {
    throw new Error('Todo not found');
  }

  return todo;
};

const getAndVerifyUser = async (token) => {
  if (!token) {
    throw new Error('No access');
  }
  let { username } = jwt.verify(token, SECRET_JWT_KEY);
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User is not found');
  }

  return user;
};

module.exports = (app) => {
  // Add new todo
  app.post('/api/todos', async (req, res) => {
    const { title } = req.body;
    const { token } = req.query;
    try {
      const user = await getAndVerifyUser(token);

      if (!title || title === '') {
        throw new Error('Title not found');
      }

      const todo = new Todo({
        id: Date.now(),
        title,
        completed: false,
        _user: user._id,
      });

      await todo.save();

      res.status(201).send(todo);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }

      return res.status(404).send({ error: error.message });
    }
  });

  // Get todos
  app.get('/api/todos', async (req, res) => {
    const { token } = req.query;
    try {
      const user = await getAndVerifyUser(token);

      const todos = await Todo.find({ _user: user._id });
      if (!todos) {
        throw new Error('Todos not found');
      }
      res.status(200).send(todos);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).end();
      }

      return res.status(404).send({ error: error.message });
    }
  });

  // Remove todo
  app.delete('/api/todos/remove/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;
    try {
      const user = await getAndVerifyUser(token);

      const todo = await getTodo(id, user);

      await todo.delete();

      res.status(200).send({ message: 'Todo is deleted' });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  });

  // Edit todo
  app.patch('/api/todos/edit/:id', async (req, res) => {
    const { id } = req.params;
    const params = req.body;
    const { token } = req.query;
    try {
      const user = await getAndVerifyUser(token);
      const todo = await getTodo(id, user);

      if (Object.keys(params).length < 1) {
        throw new Error('No change');
      }

      await todo.updateOne(params);
      res.status(200).send({ message: 'Todo is updated' });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  });
};
