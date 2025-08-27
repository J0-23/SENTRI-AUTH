# 🔐 Sentri-Auth

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

### Frontend Integration
- **Built with Next.js (App Router)**
- **React Context API** for authentication state  
- **Profile management UI** (bio, photo updates)  
- **Admin dashboard** for user management  
- **Toast notifications** via `react-hot-toast`  
- **Responsive design** with Tailwind CSS  
---

## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT, bcrypt  
- **Emailing:** Nodemailer (custom templates)  
- **Security:** HttpOnly cookies, token hashing with `crypto`
- **Frontend:** Next.js, React Context API, Axios, Tailwind CSS  

---

## API Routes

### **Authentication**
```
POST   /api/auth/register         → Register new user
POST   /api/auth/login            → Login user
GET    /api/auth/logout           → Logout user
GET    /api/auth/login-status     → Check login status
```

### **User**
```
GET    /api/auth/user             → Get logged-in user   (protected)
PATCH  /api/auth/user             → Update user profile  (protected)
PATCH  /api/auth/change-password  → Change password      (protected)
```

### **Email Verification**
```
POST   /api/auth/verify-email                   → Send verification email (protected)
POST   /api/auth/verify-user/:verificationToken → Verify user account
```

### **Password Reset**
```
POST   /api/auth/forgot-password                    → Request password reset
POST   /api/auth/reset-password/:resetPasswordToken → Reset password
```

### **Admin**
```
GET    /api/auth/admin/users     → Get all users   (creator/admin only)
DELETE /api/auth/admin/users/:id → Delete user     (admin only)
```

---

## Installation & Setup

```bash
# 1. Clone repository
+ git clone https://github.com/your-username/sentri-auth.git
+ cd sentri-auth

# 2. Install dependencies
npm install

# 3. Create environment file
touch .env
```

### **Environment Variables (`.env`)**

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
USER_EMAIL=your_email@example.com
USER_PASS=your_email_password
```

### **Run Server**

```bash
# Development
npm run dev

# Production
npm start
```

Server runs at: **http://localhost:5000**

---

## Email Templates

- **Email Verification** → `/verify-email/:token`
- **Forgot Password** → `/reset-password/:token`

_Customizable in the `sendEmail` helper._

---

## Roadmap / Improvements

- [ ] Add **refresh tokens** for long-lived sessions
- [ ] Add **rate limiting** on sensitive routes
- [ ] Add **unit & integration tests**
- [x] Build a **frontend client** (React / Next.js)

---

## License

MIT © 2025 — Built with ❤️ for secure authentication systems
