const Notification = require('../models/Notification');

/**
 * Creates a new notification.
 * @param {object} notificationData - The data for the new notification.
 * @returns {Promise<Notification>}
 */
const createNotification = async (notificationData) => {
  const notification = new Notification(notificationData);
  return await notification.save();
};

/**
 * Lists notifications for a specific user with pagination.
 * @param {string} userId - The ID of the user.
 * @param {object} paginationOptions - Options for pagination { page, limit }.
 * @returns {Promise<object>}
 */
const listNotificationsByUser = async (userId, { page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [notifications, total] = await Promise.all([
    Notification.find({ userId }).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Notification.countDocuments({ userId }),
  ]);

  return {
    notifications,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Marks a notification as read.
 * @param {string} notificationId - The ID of the notification.
 * @returns {Promise<Notification|null>}
 */
const markAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};

/**
 * Hard deletes a notification.
 * @param {string} notificationId - The ID of the notification.
 * @returns {Promise<Notification|null>}
 */
const removeNotification = async (notificationId) => {
  return await Notification.findByIdAndDelete(notificationId);
};

module.exports = {
  createNotification,
  listNotificationsByUser,
  markAsRead,
  removeNotification,
};
