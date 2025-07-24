# 🎵 JAMOVEO

**JAMOVEO** is a full-stack, real-time music collaboration app built as a home assignment for Moveo.  
It enables admins to create and control jam sessions, while users can join, follow selected songs live, and play along with scrolling lyrics and chords. Jammin' was never so fun & easy!

---
## 📌 Project Overview

- **Type**: Full-stack Web Application  
- **Goal**: Enable real-time collaborative jam sessions  
- **Target**: Admins manage sessions, users participate dynamically
---
 Jamoveo is an **MVC architectured server** web app built with a clear separation of concerns & responsibilities utilizing **RESTful API** for a smooth front-to-back integration. Convention-based, focusing on clean code and easy maintenance.
The server is structured for scalability while the client is interactive and responsive.
Tailwind CSS powers a modern, efficient, and elegant UX/UI, ensuring high-performance visuals and adaptability across different devices.


### Authentication & Live Collaboration
Secured JWT-based authentication that ensures real-time access and alerts, lightweight, and role-aware (admin/user), with seamless session syncing across clients.

### Admin Capabilities
- Create one active session (singleton mode)
- Search songs by title or artist (any sub-string)
- Start/stop session and broadcast selected song

### User Experience
- Join active session and view song content
- Real-time sync when song is selected
- Auto-scrolling of lyrics & chords (toggleable)
---

## 🧱 Tech Stack

| Frontend       | Backend       | Realtime & Auth | Styling        |
|----------------|---------------|-----------------|----------------|
| React + Vite   | Node.js + Express | Socket.IO + JWT | Tailwind CSS |


## Deployment: 
Server - via Render, Client - via Vercel
---

## 🛠️ Setup & Installation

**Server:**  
 - npm install express mongoose cors dotenv bcrypt jsonwebtoken socket.io nodemon

**Client:**  
- npm install tailwindcss @tailwindcss/postcss postcss react-router-dom axios socket.io-client autoprefixer lucide-react


## A programmer's note:
Due to the limited time frame of the assignment, I prioritized ensuring robust functionality and proper handling of boundary  cases. The remaining time was dedicated to crafting a clean and pleasant user interface.

Big thanks for your time - see you in the next session! 🎸