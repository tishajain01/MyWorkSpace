# My Workspace Explorer

## Full-Stack Project Management System

My Workspace Explorer is a full-stack project and task management application built using **Spring Boot**, **React**, and **MySQL**. The system focuses on secure authentication, clean user experience, and smooth backend–frontend integration.

---

## 🚀 Live Demo

* **Frontend:** [https://my-workspace-sigma.vercel.app](https://my-workspace-sigma.vercel.app)
* **Backend API:** [https://my-workspace-backend-kisc.onrender.com](https://my-workspace-backend-kisc.onrender.com)

---

## ✨ Key Features

* **Secure Authentication**
  User registration and login implemented using Spring Security with BCrypt password hashing.

* **Project Management**
  Create, view, update, and delete projects through a clean and intuitive interface.

* **Responsive Design**
  Fully responsive UI optimized for both mobile and desktop using Tailwind CSS.

* **Live Backend Integration**
  RESTful APIs connected to a cloud-hosted MySQL database.

* **Persistent Sessions**
  User login state and data stored using browser localStorage.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Icons

### Backend

* Java
* Spring Boot
* Spring Security
* Maven

### Database

* MySQL (Aiven Cloud)

### Deployment

* Frontend: Vercel
* Backend: Render (Dockerized Java environment)

---

## 🏗️ Local Installation

### Prerequisites

* JDK 21 or higher
* Node.js & npm
* Maven

---

### Backend Setup

```bash
cd my-workspace-backend
```

Update database credentials in:

```
src/main/resources/application.properties
```

Build and run the backend:

```bash
mvn clean install
mvn spring-boot:run
```

---

### Frontend Setup

```bash
cd my-workspace-frontend
npm install
npm start
```

---

## 🌐 Hosting Details

* **Database:** Managed MySQL instance on Aiven Cloud
* **Backend Server:** Render
* **Frontend Hosting:** Vercel Edge Network

---

## 📊 Repository Overview

* **Languages Used**

  * JavaScript: 80.7%
  * Java: 17.2%
  * Other: 2.1%

---

## 👤 Author

**Kalpesh Gunjal**

---

If you find this project useful, feel free to explore the code and suggest improvements.
