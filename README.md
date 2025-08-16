# 🔐 AuthKit

A full-featured **Authentication & Authorization API** built with **Node.js**, **Express**, **MongoDB**, and **JWT**.  
Provides **secure user management**, **role-based access control**, **email verification**, and **password reset flows** for modern apps.

---

## Features

### Authentication
- **Register** new users with validation  
- **Login** with email & password  
- **JWT-based authentication** (HttpOnly cookies)  
- **Logout** functionality  

### User Management
- Get **logged-in user details**  
- Update profile (**name, bio, photo**)  
- **Change password**  
- User roles: **user**, **creator**, **admin**  

### Email Verification
- Send **verification email**  
- **Verify accounts** via secure tokenized link  

### Password Reset
- **Forgot password** → send reset email  
- **Secure token-based reset**  
- **Automatic expiration**  

### Authorization
- Middleware-protected routes  
- **Role-based access control (RBAC)**  

### Admin Features
- **Get all users** (creator/admin only)  
- **Delete user** (admin only)  

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT, bcrypt  
- **Emailing:** Nodemailer (custom templates)  
- **Security:** HttpOnly cookies, token hashing with `crypto`  

---
