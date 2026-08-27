# DUMBBELL DAILY — Deployment Guide

## 1. Environment Configurations

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/dumbbell_daily?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
CLIENT_URL=http://localhost:5173
```

---

## 2. Deployment Instructions

### 2.1 Backend Deployment (Render / Railway)
1. Push code repository to GitHub (`dumbbell-daily`).
2. Create a new Web Service on Render / Railway pointing to `/server`.
3. Set Build Command: `npm install`
4. Set Start Command: `node app.js` or `npm start`
5. Configure Environment Variables (`MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV`).

### 2.2 Frontend Deployment (Vercel)
1. Import repository on Vercel pointing to `/client`.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Configure Environment Variable: `VITE_API_BASE_URL=https://your-backend-url.onrender.com/api`.
6. Include [`vercel.json`](file:///e:/Exercise%20Tracker/client/vercel.json) rewrite configuration to prevent Vercel 404 `NOT_FOUND` errors on SPA route refreshes.

---

## 3. Resolving Vercel `NOT_FOUND` (404 Error)
Single Page Applications (React + Vite + React Router) build a single `index.html` file. When users reload routes like `/workout` or `/exercises`, Vercel searches for physical file paths. To resolve Vercel `NOT_FOUND`:

Add `vercel.json` to the client root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
