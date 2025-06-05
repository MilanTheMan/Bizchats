# 📘 BizChats – Web & Mobile Collaboration Platform

**BizChats** is a modern **communication and collaboration tool** designed to support **educational institutions** and **professional teams**. The platform combines **real-time messaging**, **structured communication channels**, and **file sharing** to streamline teamwork. Whether you're managing a classroom, coordinating a project team, or hosting remote business meetings, **BizChats offers an all-in-one digital workspace** tailored to your needs.

The application is available as both a **web app** and a **mobile app**, ensuring users can stay connected and productive from **any device, anywhere**.

---

## 🌐 Live Web App  
**(Currently down due to hosting fees)**  
🔗 [https://main.dn5s0tbye754g.amplifyapp.com](https://main.dn5s0tbye754g.amplifyapp.com)

---

## ✨ Features

### 💬 Real-Time Messaging
- Instant message sending and receiving.
- Highly responsive chat for smooth communication.
- Supports both formal and informal team discussions.

### 🧵 Channel Management
- Organize chats by **topic, team, or project**.
- Maintain **focused** and **relevant** discussions.
- Quickly switch between channels.

### 📂 File Sharing
- Upload and share files directly in chats.
- Avoid switching between platforms for collaboration.
- Supports assignments, resources, reports, and more.

### 🔒 Secure Authentication
- Integrated with **Google reCAPTCHA**.
- Protects against unauthorized access and bots.
- Clean login/signup flow for web and mobile.

### 📱 Cross-Platform Support
- **Web App**: Desktop/laptop access via **AWS Amplify**.
- **Mobile App**: Built with **React Native**, compatible with **Android emulators** and **Expo Go**.

### ☁️ Cloud Storage
- Files securely uploaded via **AWS S3**.
- Enables **reliable storage** and **fast retrieval**.

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
3. Copy the content of the provided SQL file (located in the project root directory) and run it as a query in your MySQL database to initialize required tables and data.
4. In a separate terminal, go to the `backend` folder and run:
   ```bash
   npm install
   node server.js
   ```
5. Visit `http://localhost:3000` in your browser.

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
- **Email:** `dummyemail1@fakemail.com`
- **Password:** `password`

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
- The **web app** is live and publicly accessible via AWS.
- This project was developed as part of a collaborative academic assignment for COMP3059.
