const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Notification API is running...');
});
app.use('/notifications', notificationRoutes);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;