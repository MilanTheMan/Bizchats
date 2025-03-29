# 📘 BizChats – Web & Mobile Collaboration Platform

**BizChats** is a modern communication and collaboration tool designed to support educational institutions and professional teams. The platform combines real-time messaging, structured communication channels, and file sharing — all in a secure, user-friendly environment. Whether you're managing a classroom, coordinating a project team, or running business meetings remotely, BizChats offers an all-in-one digital workspace tailored to your needs.

The application is available as both a **web app** and a **mobile app**, ensuring that users can stay connected and productive from any device, anywhere.

---

## 🌐 Live Web App
🔗 [https://main.dn5s0tbye754g.amplifyapp.com](https://main.dn5s0tbye754g.amplifyapp.com)

---

## ✨ Features

### 💬 Real-Time Messaging
- Send and receive instant messages with no delay.
- Designed for high responsiveness to foster smooth, fluid conversations.
- Ideal for both formal updates and informal team chats.

### 🧵 Channel Management
- Create organized chat channels by topic, team, or project.
- Keep discussions focused and relevant.
- Easily switch between channels to manage different conversations simultaneously.

### 📂 File Sharing
- Upload, access, and share documents directly within chats.
- Eliminates the need to switch between different platforms for collaboration.
- Supports seamless file exchanges for assignments, resources, and reports.

### 🔒 Secure Authentication
- Integrated with Google reCAPTCHA to prevent unauthorized access and bot attacks.
- Simple and clean login/signup flow for both web and mobile versions.

### 📱 Cross-Platform Support
- **Web App** for desktop/laptop users, hosted on AWS Amplify.
- **Mobile App** built using React Native, compatible with Android emulators and Expo Go for real-device testing.

### ☁️ Cloud Storage
- Files are uploaded securely via **AWS S3**, allowing reliable storage and quick retrieval.

---

## 🛠️ Tech Stack

- **Frontend:** React (Web), React Native (Mobile), Tailwind CSS
- **Backend:** Node.js
- **Database:** MySQL
- **Cloud Hosting:** AWS Amplify
- **Storage:** AWS S3
- **Security:** Google reCAPTCHA

---

## 🚀 How to Run Locally

### 🌐 Web Application (React + Node.js)
1. **Clone the repository**
2. Navigate to the `frontend` folder and run:
   ```bash
   npm install
   npm start
   ```
3. In a separate terminal, go to the `backend` folder and run:
   ```bash
   npm install
   node server.js
   ```
4. Visit `http://localhost:3000` in your browser.

### 📱 Mobile Application (React Native)
1. Install the **Expo Go** app on your mobile device.
2. Navigate to the mobile app project folder and run:
   ```bash
   npm install
   npx expo start
   ```
3. Scan the QR code with Expo Go or launch an emulator through Android Studio.

---

## 🔐 Demo Login Credentials
- **Email:** `test@gmail.com`
- **Password:** `password`

---

## 📦 Dependencies
Install required dependencies for both frontend and backend:
```bash
npm install
```

---

## 👥 Contributors
- **Daniel John D. Fajardo III**
- **Alexis Gorospe**
- **Milan Mislov**
- **Lara Alkhatabi**
- **Fahad Al-Hadeethi**

---

## 📝 Notes
- The **mobile app** is currently not deployed and must be run locally.
- The **web app** is live and publicly accessible via AWS Amplify.
- This project was developed as part of a collaborative academic assignment for COMP3059/COMP3078.
