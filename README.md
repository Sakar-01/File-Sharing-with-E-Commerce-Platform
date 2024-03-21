# Secure-File-Storage-and-Sharing

Building a Secure File Sharing platform , this project serves as a practical exploration of file storage and sharing with Secured Authentication.

## Features

### Express Validator

- Used for input validation and sanitization in Express.js routes.
- Helps ensure that the data sent to the server is in the correct format and safe to use.

### JWT (JSON Web Tokens)

- Provides secure authentication by generating tokens that contain user information.
- Tokens are used to authenticate API requests and maintain user sessions.

### Cookies

- Manages cookies in the application, including storing session tokens and user preferences.
- Enables the server to remember users and their sessions across multiple requests.

### HTTP-Only Cookies (CSRF and XSS Protection)

- Utilizes HTTP-only cookies to mitigate Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS) attacks.
- Enhances security by preventing client-side scripts from accessing the cookie information.

### React AuthProvider

- Facilitates authentication and user session management in the React frontend.
- Integrates with JWT tokens to authenticate users and provide protected routes.

### Vite

- Used as the frontend build tool for fast development and optimized builds.
- Provides hot module replacement (HMR) for instant feedback during development.
- Supports modern JavaScript features and a streamlined development experience.

## Installation

Node version: 18.18.2 and NPM version: 9.8.1

1. Clone the repository:

   ```bash
   git clone https://github.com/Sakar-01/Secure-File-Storage-and-Sharing.git
   ```

2. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Navigate to the frontend folder and install dependencies:
   ```bash
   ../cd frontend 
   npm install
   ```
## Running the Application
 ```bash
   cd backend
   npm run dev
   ```
Open your browser and navigate to http://localhost:3000 to view the application.

## Additional Notes
- Make sure MongoDB is installed and running locally or provide the appropriate connection URI in the backend configuration.
- Customize the authentication logic, routes, and frontend components as per your project requirements.
