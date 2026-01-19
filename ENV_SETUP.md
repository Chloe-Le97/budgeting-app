# Environment Variables Setup Guide

This guide will help you set up environment variables for the Budgeting App.

## Quick Setup

### Backend Environment Variables

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Copy the sample environment file:
   ```bash
   cp .env-sample .env
   ```

3. Edit the `.env` file with your configuration:
   ```env
   DATABASE_URL=postgres://postgres:example@localhost:5432/postgres
   PORT=3001
   SECRET=your-secure-secret-key-here
   ```

   **Important Notes:**
   - For Docker Compose: Use `db` as the hostname instead of `localhost`
   - For local development: Use `localhost` as the hostname
   - Generate a secure SECRET: `openssl rand -base64 32`

### Frontend Environment Variables

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Create a `.env` file:
   ```bash
   touch .env
   ```

3. Add the following content:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

   **Important Notes:**
   - For Docker: Use `http://localhost:3001` (backend is exposed on host)
   - For production: Use your production API URL
   - Vite requires the `VITE_` prefix for environment variables

## Environment-Specific Configurations

### Local Development (No Docker)

**Backend `.env`:**
```env
DATABASE_URL=postgres://your_username:your_password@localhost:5432/budgeting_app
PORT=3001
SECRET=your-secret-key
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:3001
```

### Docker Compose

**Backend `.env`:**
```env
DATABASE_URL=postgres://postgres:example@db:5432/postgres
PORT=3001
SECRET=your-secret-key
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:3001
```

### Production

**Backend `.env`:**
```env
DATABASE_URL=postgres://user:password@your-db-host:5432/dbname
PORT=3001
SECRET=<generate-strong-random-secret>
```

**Frontend `.env`:**
```env
VITE_API_URL=https://api.yourdomain.com
```

## Security Best Practices

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use strong secrets** - Generate with: `openssl rand -base64 32`
3. **Rotate secrets regularly** - Especially if exposed
4. **Use different secrets** - For development, staging, and production
5. **Restrict database access** - Use strong passwords and limit network access

## Troubleshooting

### Frontend can't connect to backend
- Check that `VITE_API_URL` matches your backend URL
- Ensure backend is running on the specified port
- Check CORS configuration in backend

### Database connection errors
- Verify `DATABASE_URL` format is correct
- Check database is running and accessible
- Verify credentials are correct
- For Docker: ensure database container is running

### Environment variables not loading
- **Frontend**: Ensure variables start with `VITE_` prefix
- Restart development server after changing `.env` files
- Check file is named exactly `.env` (not `.env.local` or similar)
