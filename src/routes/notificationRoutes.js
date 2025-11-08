const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// POST /notifications - Create a new notification
router.post('/', notificationController.create);

// GET /notifications/user/:userId - List notifications for a user (paginated)
router.get('/user/:userId', notificationController.listByUser);

// PATCH /notifications/:id/read - Mark a notification as read
router.patch('/:id/read', notificationController.markAsRead);

// DELETE /notifications/:id - Remove a notification
router.delete('/:id', notificationController.remove);

module.exports = router;