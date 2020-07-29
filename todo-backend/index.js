const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/config/config.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./src/models/todo');
require('./src/models/user');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());
require('./src/routes/authRoutes')(app);
require('./src/routes/todosRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port - ${PORT}`));
