const notificationService = require('../services/notificationService');
const Joi = require('joi');

const createNotificationSchema = Joi.object({
  userId: Joi.string().required(),
  content: Joi.string().required(),
});

const create = async (req, res, next) => {
  try {
    const { error, value } = createNotificationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation Error', details: error.details });
    }
    const notification = await notificationService.createNotification(value);
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

const listByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const result = await notificationService.listNotificationsByUser(userId, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await notificationService.markAsRead(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await notificationService.removeNotification(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  listByUser,
  markAsRead,
  remove,
};
