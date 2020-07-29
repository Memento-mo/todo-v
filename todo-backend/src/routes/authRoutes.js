const mongoose = require('mongoose');
const { SECRET_JWT_KEY, JWT_EXPIRY_SECONDS } = require('../config/config');
const jwt = require('jsonwebtoken');

const User = mongoose.model('user');

module.exports = (app) => {
  // Create user
  app.post('/auth/signup', async (req, res) => {
    const { username, password, email } = req.body;

    try {
      if (!username || !password || !email) {
        throw new Error('Username | password | email - not found');
      }

      const isUser = await User.findOne({ username });
      if (isUser) {
        throw new Error('Such user already existser ');
      }

      const user = new User({
        userId: Date.now(),
        username,
        password,
        email,
        role: 'user',
      });

      await user.save();

      return res.status(201).send('User created');
    } catch ({ message }) {
      return res.status(400).send({ message });
    }
  });

  // Log In
  app.post('/auth/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        throw new Error('Not found username && password');
      }

      const token = jwt.sign({ username }, SECRET_JWT_KEY, {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRY_SECONDS,
      });
      console.log('token: ', token);

      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User is not found');
      }

      if (user.password !== password) {
        throw new Error('Password mismatch');
      }

      await user.update({ token });

      await user.save();

      res.cookie('token', token, {
        maxAge: JWT_EXPIRY_SECONDS * 1000,
      });
      return res.status(200).send({ token });
    } catch ({ message }) {
      return res.status(400).send({ message });
    }
  });

  // Get users
  app.get('/auth/users', async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        throw new Error('Token is not found');
      }
      let { username } = jwt.verify(token, SECRET_JWT_KEY);
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('User is not found');
      }
      if (user.role === 'user') {
        return res.status(401).end();
      } else if (user.role === 'admin') {
        const users = await User.find();
        return res.status(200).send(users);
      }

      return res.status(404).end();
    } catch ({ message }) {
      return res.status(400).send({ message });
    }
  });

  app.post('/auth/logout', async (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new Error('User not a sign');
      }

      res.clearCookie('token');

      return res.status(201).send('Logout success');
    } catch ({ message }) {
      return res.status(400).send({ message });
    }
  });
};
