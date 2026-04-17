# AVELLIN — Premium E-commerce Platform

AVELLIN is a high-end fashion and clinical skincare e-commerce platform specifically tailored for the Nigerian market. Built with a focus on luxury aesthetics, high performance, and security.

## 🚀 Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion, Zustand (State), React Router.
- **Backend**: Node.js, Express, Supabase (Database & Auth), Express Validator, Helmet, Rate Limit.
- **Deployment**: Vercel (Frontend), Render (Backend).

## 📁 Folder Structure

```
Avellin53/
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks (Recommendations, etc)
│   │   ├── pages/        # Page components (Home, Shop, Admin, etc)
│   │   └── store/        # Zustand state stores
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── middleware/   # Security and Validation middlewares
│   │   └── index.js      # Main API entry point
│   └── database/         # SQL Schemas and Seed files
└── .env                  # Shared environment variables
```

## 🔐 Environment Variables

Ensure you have a `.env` file in the root directory with the following variables:

| Variable | Description |
| :--- | :--- |
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_ANON_KEY` | Supabase Anonymous Client Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (for admin tasks) |
| `JWT_SECRET` | Strong secret for JWT signing (minimum 32 chars) |
| `FRONTEND_URL` | The URL where your frontend is hosted (for CORS) |
| `PORT` | Backend port (default 5000) |

## 🛠️ Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Avellin53
   ```

2. **Setup Database**:
   - Go to Supabase Dashboard.
   - Run `backend/database/schema.sql` in the SQL Editor.
   - Run `backend/database/rls.sql` to enable security policies.
   - (Optional) Run `backend/database/seed_data.js` to populate products.

3. **Install Dependencies**:
   ```bash
   # Root / Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

4. **Run Application**:
   - Start Backend: `cd backend && npm run dev`
   - Start Frontend: `cd frontend && npm run dev`

## 🌍 Deployment

### Vercel (Frontend)
- Connect your repository to Vercel.
- Set **Root Directory** to `frontend`.
- Add all required environment variables.
- The `vercel.json` ensures proper SPA routing.

### Render (Backend)
- Create a new **Web Service** on Render.
- Set **Root Directory** to `backend`.
- Build Command: `npm install`
- Start Command: `node src/index.js`
- Add environment variables.

## 🛡️ Security Features
- **Helmet**: Secure HTTP headers.
- **Rate Limiting**: Prevent brute-force and DOS attacks.
- **Input Sanitization**: Using `express-validator` and `DOMPurify`.
- **Supabase RLS**: Fine-grained access control at the database level.
- **Bcrypt**: 10+ rounds for password hashing.
