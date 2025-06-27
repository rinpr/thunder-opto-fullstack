# Thunder Opto Fullstack

A fullstack web application for customer, service, and sales management for optical businesses.  
Built with Next.js (frontend) and Golang (backend) with MongoDB.

---

## Features

- Customer management (add, edit, search)
- Service & sales management
- Responsive UI with Tailwind CSS
- Light/Dark mode toggle
- RESTful API with Go Fiber
- MongoDB integration

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** Go (Fiber), MongoDB
- **Other:** Docker (optional), ESLint, Prettier

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Go (v1.20+)
- MongoDB

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/rinpr/thunder-opto-fullstack.git
cd thunder-opto-fullstack
```

#### 2. Backend (Golang)

```bash
cd backend/golang
go mod tidy
go run main.go
```

- The backend will start on `http://localhost:8080`

#### 3. Frontend (Next.js)

```bash
cd frontend/thunder-opto-next-js
npm install
npm run dev
```

- The frontend will start on `http://localhost:3000`

---

## API Endpoints

- `POST /api/customer` - Create new customer
- `GET /api/customer` - Get all customers
- `GET /api/customer/:id` - Get customer by ID
- `GET /api/customer/search?search=...` - Search customers

---

## Project Structure

```
thunder-opto-fullstack/
├── backend/
│   └── golang/
│       ├── controller/
│       ├── models/
│       ├── repository/
│       ├── service/
│       └── main.go
├── frontend/
│   └── thunder-opto-next-js/
│       ├── src/
│       └── package.json
└── README.md
```

---

## License

MIT

---

## Author

- [Java_Rin](https://github.com/rinpr)