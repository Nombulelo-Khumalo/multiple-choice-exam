# **JWT Authentication with Express and Frontend**

This project demonstrates a simple **User Registration and Login** system using **JWT (JSON Web Tokens)** for authentication, implemented with **Express.js** for the backend and simple **HTML** for the frontend.

---

## **Features**

- **User Registration**:  
  Users can register by providing an email and password. Passwords are hashed for security using `bcryptjs`.
- **User Login**:  
  Registered users can log in by providing their email and password. Upon successful login, a **JWT token** is generated and returned to the client.

- **Protected Routes**:  
  Authenticated routes (like the `/exam` route) require the user to send the JWT token in the request header to access protected data.

---

## **Getting Started**

### **Prerequisites**

Make sure you have **Node.js** and **npm** installed on your machine.

- [Download and install Node.js](https://nodejs.org/)

---

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the server**:
   In the project root directory, run the following command to start the Express server:
   ```bash
   node app.js
   ```
   The server will be running on [http://localhost:3000](http://localhost:3000).

---

## **API Endpoints**

### **1. `/register` - POST**

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Response**:
  - On success (201):
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  - On failure (400 - User already exists):
    ```json
    {
      "message": "User already exists"
    }
    ```

### **2. `/login` - POST**

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Response**:
  - On success (200):
    ```json
    {
      "token": "<JWT_TOKEN>"
    }
    ```
  - On failure (400 - Invalid credentials):
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### **3. `/exam` - GET (Protected Route)**

- **Headers**:  
  Include the JWT token in the `Authorization` header:  
  `Authorization: Bearer <JWT_TOKEN>`

- **Response**:
  - On success (200):
    ```json
    {
      "message": "Welcome to your profile!",
      "user": {
        "userId": 1,
        "email": "user@example.com",
        "iat": 1234567890,
        "exp": 1234567890
      }
    }
    ```
  - On failure (401 - Unauthorized):
    ```json
    {
      "message": "Access Denied"
    }
    ```

---

## **Frontend**

The frontend consists of simple HTML pages:

1. **login.html**: A page where users can log in with their email and password.
2. **register.html**: A page where new users can register.
3. **exam.html**: A page that displays the user's protected data after successful login and authentication.

Each HTML page uses JavaScript to send requests to the backend API and handle the response.

---

## **How to Use**

1. **Register a New User**:

   - Go to `register.html`, fill in the registration form with an email and password, and submit it. If successful, you will be redirected to the login page.

2. **Log in**:

   - Go to `login.html`, enter user name, the registered email and password, and submit the form. Upon successful login, you will be redirected to the `exam.html`, where the protected information is displayed.

3. **Access Protected Profile**:
   - After login, the user will be redirected to `exam.html`. This page makes an authenticated request to the `/exam` endpoint using the JWT token stored in the browser's local storage.

---

### **Testing with Postman**

1. **Download and Install Postman**:  
   If you haven't already, download and install [Postman](https://www.postman.com/downloads/), which is a tool for testing APIs.

2. **Register a New User**:

   - Open Postman.
   - Set the **HTTP method** to `POST` and enter the following URL:  
     `http://localhost:3000/register`
   - In the **Body** tab, select `raw` and choose `JSON` from the dropdown.
   - Enter the following data in JSON format:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Click **Send**. If successful, the response will return a message like:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

3. **Log in**:

   - Set the **HTTP method** to `POST` and enter the following URL:  
     `http://localhost:3000/login`
   - In the **Body** tab, select `raw` and choose `JSON` from the dropdown.
   - Enter the following data in JSON format (use the same email and password you registered):
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - Click **Send**. If successful, the response will return a token:
     ```json
     {
       "token": "<JWT_TOKEN>"
     }
     ```

4. **Access Protected Profile**:
   - Set the **HTTP method** to `GET` and enter the following URL:  
     `http://localhost:3000/profile`
   - In the **Headers** tab, add a new header:
     - **Key**: `Authorization`
     - **Value**: `Bearer <JWT_TOKEN>` (replace `<JWT_TOKEN>` with the token you received during login).
   - Click **Send**. If the token is valid, you will receive a response with user data, like:
     ```json
     {
       "message": "Welcome to your profile!",
       "user": {
         "userId": 1,
         "email": "user@example.com",
         "iat": 1732232552,
         "exp": 1732236152
       }
     }
     ```

---

## **Technologies Used**

- **Backend**:

  - **Express.js** for API development
  - **JWT (JSON Web Token)** for authentication
  - **bcryptjs** for password hashing

- **Frontend**:
  - **HTML/CSS** for basic structure and styling
  - **JavaScript** for sending requests and handling JWT tokens

---

## **License**

This project is licensed under the MIT License.

---
