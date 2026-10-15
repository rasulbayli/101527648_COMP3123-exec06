require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

const PORT = Number(process.env.PORT) || 8081;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/comp3123_exec06';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.type('html').send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});
app.use('/api', noteRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

async function start() {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected to MongoDB');
    return app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (err) {
    console.error('Could not connect to MongoDB:', err.message);
    process.exitCode = 1;
    return null;
  }
}

if (require.main === module) start();
module.exports = { app, start };
