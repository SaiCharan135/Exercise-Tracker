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
1. Import repository on Vercel.
2. If deploying from Root: Set **Root Directory** to `client` OR use root [`vercel.json`](file:///e:/Exercise%20Tracker/vercel.json) with `outputDirectory: "client/dist"`.
3. Framework Preset: `Vite`.
4. Build Command: `npm run build`
5. Output Directory: `client/dist` (or `dist` if Root Directory is `client`).
6. Configure Environment Variable: `VITE_API_BASE_URL=https://your-backend-url.onrender.com/api`.

---

## 3. Resolving Vercel "Build output contains no 'functions' or 'static' directory"
This warning occurs when Vercel builds the project from the root folder, but Vite places the production bundle inside `client/dist`. 

Root [`vercel.json`](file:///e:/Exercise%20Tracker/vercel.json) solves this by explicitly specifying the output location:
```json
{
  "version": 2,
  "buildCommand": "npm run build --prefix client",
  "outputDirectory": "client/dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
