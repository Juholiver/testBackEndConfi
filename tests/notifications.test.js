const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Notification = require('../src/models/Notification');
require('dotenv').config();

// Use a separate test database
const mongoTestUri = `${process.env.MONGO_URI}testNotificationAPI`;

beforeAll(async () => {
  await mongoose.connect(mongoTestUri);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Notification.deleteMany({});
});

describe('Notifications API', () => {
  describe('POST /notifications', () => {
    it('should create a new notification and return 201', async () => {
      const res = await request(app)
        .post('/notifications')
        .send({
          userId: 'user123',
          content: 'This is a test notification.',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.userId).toBe('user123');
      expect(res.body.content).toBe('This is a test notification.');
      expect(res.body.isRead).toBe(false);

      const notificationInDb = await Notification.findById(res.body._id);
      expect(notificationInDb).not.toBeNull();
    });

    it('should return 400 for invalid payload', async () => {
      const res = await request(app)
        .post('/notifications')
        .send({
          userId: 'user123',
          // Missing content
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Validation Error');
    });
  });

  describe('GET /notifications/user/:userId', () => {
    beforeEach(async () => {
      // Create a batch of notifications for a specific user
      const notifications = [
        { userId: 'user-with-notifications', content: 'Notification 1' },
        { userId: 'user-with-notifications', content: 'Notification 2' },
        { userId: 'user-with-notifications', content: 'Notification 3' },
        { userId: 'another-user', content: 'Notification for another user' },
      ];
      await Notification.insertMany(notifications);
    });

    it('should return all notifications for a specific user', async () => {
      const res = await request(app).get('/notifications/user/user-with-notifications');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.notifications).toHaveLength(3);
      expect(res.body.total).toBe(3);
      expect(res.body.page).toBe(1);
      expect(res.body.totalPages).toBe(1);
    });

    it('should return paginated results correctly', async () => {
      const res = await request(app).get('/notifications/user/user-with-notifications?page=2&limit=2');

      expect(res.statusCode).toEqual(200);
      expect(res.body.notifications).toHaveLength(1);
      expect(res.body.total).toBe(3);
      expect(res.body.page).toBe(2);
      expect(res.body.totalPages).toBe(2);
    });

    it('should return an empty array if the user has no notifications', async () => {
      const res = await request(app).get('/notifications/user/user-with-no-notifications');

      expect(res.statusCode).toEqual(200);
      expect(res.body.notifications).toHaveLength(0);
      expect(res.body.total).toBe(0);
    });
  });

  describe('PATCH /notifications/:id/read', () => {
    it('should mark a notification as read and return 200', async () => {
      const notification = await new Notification({
        userId: 'user456',
        content: 'Please read me.',
      }).save();

      const res = await request(app)
        .patch(`/notifications/${notification._id}/read`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.isRead).toBe(true);

      const updatedNotificationInDb = await Notification.findById(notification._id);
      expect(updatedNotificationInDb.isRead).toBe(true);
    });

    it('should return 404 if notification not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/notifications/${nonExistentId}/read`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Notification not found');
    });
  });

  describe('DELETE /notifications/:id', () => {
    it('should permanently delete a notification and return 204', async () => {
      const notification = await new Notification({
        userId: 'user789',
        content: 'This will be deleted.',
      }).save();

      const res = await request(app)
        .delete(`/notifications/${notification._id}`);

      expect(res.statusCode).toEqual(204);

      const deletedNotificationInDb = await Notification.findById(notification._id);
      expect(deletedNotificationInDb).toBeNull();
    });
  });
});
