# Notification API

A simple Notification API built with Node.js, Express, and MongoDB. This API allows users to manage notifications, including creating, listing, marking as read, and deleting them.

## Features

*   **Create Notifications:** Add new notifications for users.
*   **List Notifications:** Retrieve notifications for a specific user with pagination.
*   **Mark as Read:** Update the status of a notification to 'read'.
*   **Delete Notifications:** Remove notifications from the system.
*   **Robust Error Handling:** Centralized error handling middleware.
*   **Data Validation:** Request payload validation using Joi.

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js:** Version 18 or higher.
*   **npm:** Node Package Manager (comes with Node.js).
*   **MongoDB:** A running instance of MongoDB (local or cloud-hosted).
*   **Git:** For cloning the repository.
*   **VS Code (Recommended):** For development, especially if using Thunder Client.
*   **Postman or Thunder Client:** For API testing.

## Getting Started

Follow these steps to get your development environment set up.

### 1. Cloning the Repository

First, clone the project repository from GitHub to your local machine:

```bash
git clone <YOUR_REPOSITORY_URL_HERE>
cd testBackEndConfi
```

**Note:** Replace `<YOUR_REPOSITORY_URL_HERE>` with the actual URL of your GitHub repository.

### 2. Installing Dependencies

Navigate into the project directory and install all the necessary Node.js dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of your project based on the `.env.example` file. This file will store your sensitive configuration details, such as your MongoDB connection string.

```bash
cp .env.example .env
```

Open the newly created `.env` file and update the `MONGO_URI` and `DB_NAME` variables with your MongoDB connection details:

```
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ # Your MongoDB connection string
DB_NAME=notificationdb # Your desired database name

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Running the Application

You can start the application in development mode (with `nodemon` for auto-restarts) or in production mode:

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

The API will typically run on `http://localhost:3000` (or the `PORT` specified in your `.env` file).

## Running Tests

The project includes unit tests for the API endpoints and services. You can also test the API manually using tools like Thunder Client or Postman.

### 1. Unit Tests

To run the automated unit tests, use the following command:

```bash
npm test
```

This will execute all tests defined in the `tests/` directory.

### 2. API Testing with Thunder Client (VS Code Extension)

Thunder Client is a lightweight REST API client integrated directly into VS Code.

1.  **Install Thunder Client:**
    *   Open VS Code.
    *   Go to the Extensions view (Ctrl+Shift+X).
    *   Search for "Thunder Client" and install it.

2.  **Open Thunder Client:**
    *   After installation, click on the Thunder Client icon (usually a lightning bolt) in the VS Code activity bar.

3.  **Create a New Request:**
    *   Click on "New Request".

4.  **Configure and Send Requests:**
    *   **Method:** Select the HTTP method (GET, POST, PATCH, DELETE).
    *   **URL:** Enter your API endpoint URL (e.g., `http://localhost:3000/notifications`).
    *   **Headers:** Add any required headers (e.g., `Content-Type: application/json`).
    *   **Body:** For POST/PATCH requests, select "JSON" and provide the JSON payload.
    *   Click "Send" to execute the request and view the response.

**Example Requests:**

*   **POST /notifications**
    *   Method: `POST`
    *   URL: `http://localhost:3000/notifications`
    *   Body (JSON):
        ```json
        {
          "userId": "user123",
          "content": "This is a test notification from Thunder Client."
        }
        ```
    *   Expected: Status `201 Created`, and the created notification object.

*   **GET /notifications/user/:userId**
    *   Method: `GET`
    *   URL: `http://localhost:3000/notifications/user/user123` (replace `user123` with an actual user ID)
    *   Expected: Status `200 OK`, and a list of notifications for that user.

*   **PATCH /notifications/:id/read**
    *   Method: `PATCH`
    *   URL: `http://localhost:3000/notifications/<NOTIFICATION_ID>/read` (replace `<NOTIFICATION_ID>` with an `_id` from a created notification)
    *   Expected: Status `200 OK`, and the updated notification with `isRead: true`.

*   **DELETE /notifications/:id**
    *   Method: `DELETE`
    *   URL: `http://localhost:3000/notifications/<NOTIFICATION_ID>`
    *   Expected: Status `204 No Content`.

### 3. API Testing with Postman

Postman is a popular standalone application for API development and testing.

1.  **Download and Install Postman:**
    *   If you don't have Postman, download it from [Postman's official website](https://www.postman.com/downloads/).

2.  **Create a New Request:**
    *   Open Postman.
    *   Click on the `+` tab to create a new request, or click "New" -> "HTTP Request".

3.  **Configure and Send Requests:**
    *   **Method:** Select the HTTP method (GET, POST, PATCH, DELETE) from the dropdown.
    *   **URL:** Enter your API endpoint URL (e.g., `http://localhost:3000/notifications`).
    *   **Headers:** Go to the "Headers" tab and add any required headers (e.g., `Content-Type: application/json`).
    *   **Body:** For POST/PATCH requests, go to the "Body" tab, select "raw" and then "JSON" from the dropdown, and provide the JSON payload.
    *   Click "Send" to execute the request and view the response in the lower panel.

**Example Requests (same as Thunder Client examples):**

*   **POST /notifications**
    *   Method: `POST`
    *   URL: `http://localhost:3000/notifications`
    *   Body (raw, JSON):
        ```json
        {
          "userId": "user123",
          "content": "This is a test notification from Postman."
        }
        ```
    *   Expected: Status `201 Created`, and the created notification object.

*   **GET /notifications/user/:userId**
    *   Method: `GET`
    *   URL: `http://localhost:3000/notifications/user/user123`
    *   Expected: Status `200 OK`, and a list of notifications.

*   **PATCH /notifications/:id/read**
    *   Method: `PATCH`
    *   URL: `http://localhost:3000/notifications/<NOTIFICATION_ID>/read`
    *   Expected: Status `200 OK`, and the updated notification.

*   **DELETE /notifications/:id**
    *   Method: `DELETE`
    *   URL: `http://localhost:3000/notifications/<NOTIFICATION_ID>`
    *   Expected: Status `204 No Content`.

## Project Structure

```
.
├── .env.example
├── jest.config.js
├── package.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── notificationController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Notification.js
│   ├── routes/
│   │   └── notificationRoutes.js
│   └── services/
│       └── notificationService.js
└── tests/
    └── notifications.test.js
```

## License

This project is licensed under the ISC License.

---
**Note:** Ensure your MongoDB instance is running before starting the application or running tests.
