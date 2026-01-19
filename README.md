# Budgeting App 💰

A full-stack web application for personal finance management. Track your income, expenses, budgets, and assets all in one place with an intuitive and modern interface.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with signup and login
- **Expense Tracking**: Record and categorize your daily expenses
- **Income Management**: Track your income sources and amounts
- **Budget Planning**: Set monthly budgets and monitor spending progress
- **Asset Management**: Manage multiple financial accounts (bank accounts, cash, etc.)
- **Bill Tracking**: Keep track of recurring bills and payments
- **Category Management**: Customize expense and income categories with icons
- **Transfer Tracking**: Record transfers between different assets
- **Visual Analytics**: Progress indicators and spending summaries
- **Responsive Design**: Modern UI built with Ant Design and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query (TanStack Query)** - Data fetching and caching
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Umzug** - Database migrations

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) OR **Docker** and **Docker Compose** - [Download Docker](https://www.docker.com/products/docker-desktop)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

This is the easiest way to get started as it sets up everything automatically.

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd budgeting-app
   ```

2. **Set up environment variables**

   **Backend:**
   ```bash
   cd backend
   cp .env-sample .env
   ```
   
   Edit `backend/.env` and update the values:
   ```env
   DATABASE_URL=postgres://postgres:example@db:5432/postgres
   PORT=3001
   SECRET=your-secure-secret-key-here
   ```

   **Frontend:**
   ```bash
   cd ../client
   ```
   
   Create a `.env` file:
   ```bash
   echo "VITE_API_URL=http://localhost:3001" > .env
   ```

3. **Start all services**
   ```bash
   cd ..
   docker-compose up
   ```

   This will start:
   - PostgreSQL database on port `5432`
   - Backend API server on port `3001`
   - Frontend development server on port `5173`

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Option 2: Local Development (Without Docker)

If you prefer to run services locally:

1. **Set up PostgreSQL database**
   ```bash
   # Create a new database
   createdb budgeting_app
   ```

2. **Set up Backend**

   ```bash
   cd backend
   
   # Install dependencies
   npm install
   
   # Copy environment file
   cp .env-sample .env
   ```

   Edit `backend/.env`:
   ```env
   DATABASE_URL=postgres://your_username:your_password@localhost:5432/budgeting_app
   PORT=3001
   SECRET=your-secure-secret-key-here
   ```

   ```bash
   # Start the backend server
   npm run dev
   ```

3. **Set up Frontend**

   Open a new terminal:
   ```bash
   cd client
   
   # Install dependencies
   npm install
   
   # Create environment file
   echo "VITE_API_URL=http://localhost:3001" > .env
   ```

   ```bash
   # Start the frontend development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🔧 Environment Variables

### Backend (`.env` in `backend/` directory)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:port/db` |
| `PORT` | Server port | `3001` |
| `SECRET` | JWT secret key (change in production!) | `your-secret-key` |

**⚠️ Security Note**: Always use a strong, random secret key in production. Generate one with:
```bash
openssl rand -base64 32
```

### Frontend (`.env` in `client/` directory)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3001` |

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser.

## 📁 Project Structure

```
budgeting-app/
├── backend/
│   ├── controllers/      # Route handlers
│   │   ├── assets.js
│   │   ├── bill.js
│   │   ├── budget.js
│   │   ├── category.js
│   │   ├── expenses.js
│   │   ├── income.js
│   │   ├── login.js
│   │   ├── transfer.js
│   │   └── users.js
│   ├── models/           # Sequelize models
│   │   ├── asset.js
│   │   ├── category.js
│   │   ├── expense.js
│   │   ├── index.js
│   │   └── user.js
│   ├── util/             # Utilities
│   │   ├── config.js     # Environment config
│   │   └── db.js         # Database connection
│   ├── Dockerfile
│   ├── index.js          # Express app entry point
│   ├── package.json
│   └── .env-sample       # Environment variables template
│
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Assets/
│   │   │   ├── AuthForm/
│   │   │   ├── AuthProvider/
│   │   │   ├── Bill/
│   │   │   ├── Budget/
│   │   │   ├── Category/
│   │   │   ├── Expenses/
│   │   │   ├── NavigationMenu/
│   │   │   ├── Notification/
│   │   │   └── ProtectedRoute/
│   │   ├── services/     # API service functions
│   │   ├── utils/        # Utility functions
│   │   ├── config.js     # Frontend configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── .env              # Frontend environment variables (create this)
│
├── compose.yaml          # Docker Compose configuration
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/users` - User registration

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Income
- `GET /api/income` - Get all income records
- `POST /api/income` - Create income record

### Budget
- `GET /api/budget` - Get user budget
- `POST /api/budget` - Create budget
- `PUT /api/budget` - Update budget

### Assets
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category

### Bills
- `GET /api/bill` - Get all bills
- `POST /api/bill` - Create bill

### Transfers
- `POST /api/transfer` - Create transfer between assets

**Note**: Most endpoints require JWT authentication via `Authorization: Bearer <token>` header.

## 🧪 Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development

```bash
cd client
npm run dev  # Starts Vite dev server
```

### Database Migrations

The app uses Umzug for database migrations. Migrations run automatically when the backend starts.

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build
```

## 🔒 Security Considerations

- **JWT Secret**: Always use a strong, random secret in production
- **Password Hashing**: Passwords are hashed using bcryptjs
- **CORS**: Configured for development; adjust for production
- **Environment Variables**: Never commit `.env` files to version control
- **Input Validation**: Consider adding express-validator for request validation
- **Rate Limiting**: Consider adding rate limiting for production use

## 🚧 Future Improvements

- [ ] Add unit and integration tests
- [ ] Implement input validation middleware
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement rate limiting
- [ ] Add data export functionality
- [ ] Enhanced analytics and charts
- [ ] Mobile app support
- [ ] Multi-currency support
- [ ] Recurring transaction automation

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Built as a portfolio project to demonstrate full-stack development skills.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Happy Budgeting! 💸**
