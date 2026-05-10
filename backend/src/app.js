const express = require('express');

const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const projectRoutes = require('./routes/projectRoutes');

const taskRoutes = require('./routes/taskRoutes');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);

app.use('/api/tasks', taskRoutes);

app.use('/api/users', userRoutes);

module.exports = app;