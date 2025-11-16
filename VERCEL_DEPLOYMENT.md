# DEPLOYMENT GUIDE FOR VERCEL

## Backend Deployment

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository (or upload backend folder)
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

5. Add Environment Variables:
   - `DB_CONNECTION_STRING`: mongodb+srv://luunguyenminhtriet021025_db_user:fellix021025@cluster0.7v6gqw3.mongodb.net/employeeDB?retryWrites=true&w=majority&appName=Cluster0
   - `NODE_ENV`: production

6. Click "Deploy"
7. Copy your backend URL (e.g., https://your-backend.vercel.app)

---

## Frontend Deployment

1. Update `.env.production` with your backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api/v1
   ```

2. Go to Vercel and click "Add New Project"
3. Import your repository (or upload frontend folder)
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add Environment Variable:
   - `REACT_APP_API_URL`: https://your-backend-url.vercel.app/api/v1

6. Click "Deploy"

---

## After Deployment

- Backend URL: https://your-backend.vercel.app
- Frontend URL: https://your-frontend.vercel.app
- Test the API: https://your-backend.vercel.app/api/health
- Test the app: https://your-frontend.vercel.app

## Important Notes

- Make sure both deployments use the same MongoDB connection string
- The frontend MUST know the backend URL via REACT_APP_API_URL
- CORS is already configured in the backend
- JWT authentication is already set up
