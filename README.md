# LostFound – Campus Lost & Found Board

A full stack web application that helps students report, search, and claim lost or found items within their campus.

---

# Problem Statement

In college campuses, students frequently lose personal belongings such as ID cards, wallets, keys, headphones, chargers, and other valuables.

Currently, there is **no centralized digital system** for reporting lost or found items. Most students rely on:

* WhatsApp groups
* Notice boards
* Asking around campus
* Social media posts

These methods are **unorganized, inefficient, and unreliable**, which often results in lost items never being returned to their rightful owners.

---

# Proposed Solution

**LostFound** is a dedicated **digital lost-and-found platform for campuses**.

Students can:

* Report lost items
* Post found items
* Search existing listings
* Request to claim items with verification

The system organizes all lost and found reports in one place, making it easier for students to recover their belongings.

Each campus can have its **own board**, ensuring that the system remains relevant and easy to use for students.

---

# Key Features

### Post Lost Items

Students can report items they have lost by providing:

* Item name
* Description
* Location last seen
* Date and time
* Image (optional)

---

### Post Found Items

Users can post items they have found on campus with:

* Item details
* Photo
* Location where it was found

---

### Claim Request System

If a student believes an item belongs to them, they can submit a **claim request**.

The owner or finder can verify the claim through a simple verification question before returning the item.

---

### Search and Filtering

Users can easily search and filter items based on:

* Item name
* Lost or found category
* Location
* Date

---

### Pagination

Large item lists are displayed with pagination to improve performance and user experience.

---

### Authentication System

Users can:

* Create an account
* Login to their account
* Manage their posts and claim requests

---

### Responsive Interface

The application is fully responsive and works on:

* Desktop
* Tablet
* Mobile devices

---

# Tech Stack

## Frontend

* React (Vite)
* TailwindCSS
* React Router
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

---

# Project Structure

```
lostfound
│
├── frontend
│   └── client
│       └── src
│           ├── components
│           ├── pages
│           ├── features
│           ├── hooks
│           ├── context
│           ├── services
│           └── utils
│
└── backend
    ├── config
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    └── utils
```

---

# Setup Instructions

### Clone the repository

```
git clone https://github.com/your-username/lostfound.git
```

---

### Install frontend dependencies

```
cd frontend/client
npm install
npm run dev
```

---

### Install backend dependencies

```
cd backend
npm install
npm run dev
```

---

# Future Improvements

* Image upload support
* Real-time notifications
* Smart matching for lost and found items
* Campus-specific boards
* Admin moderation tools

---

