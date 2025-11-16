# DEPLOYMENT GUIDE FOR RAILWAY

Railway is easier than Vercel for full-stack apps and handles MongoDB connections better.

## Prerequisites
- GitHub account
- Railway account (sign up at https://railway.app with GitHub)
- MongoDB Atlas connection string

---

## Backend Deployment

### Step 1: Create New Project
1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository: `101542519_comp3123_assignment2_reactjs`

### Step 2: Configure Backend Service
1. Railway will detect your monorepo
2. Click **"Add Service"** or it may auto-detect
3. Click on the service that was created
4. Go to **Settings**:
   - **Service Name**: `backend` (or any name you prefer)
   - **Root Directory**: `backend`
   - **Start Command**: `node server.js`
   - **Watch Paths**: `backend/**`

### Step 3: Add Environment Variables
1. Click on your backend service
2. Go to **"Variables"** tab
3. Click **"New Variable"** and add:
   - **Variable**: `DB_CONNECTION_STRING`
   - **Value**: `mongodb+srv://luunguyenminhtriet021025_db_user:fellix021025@cluster0.7v6gqw3.mongodb.net/employeeDB?retryWrites=true&w=majority&appName=Cluster0`
   
4. Add another variable:
   - **Variable**: `NODE_ENV`
   - **Value**: `production`

5. Add port variable (Railway auto-assigns):
   - **Variable**: `PORT`
   - **Value**: Leave empty (Railway will auto-assign)

### Step 4: Generate Public Domain
1. In your backend service, go to **"Settings"**
2. Scroll down to **"Networking"**
3. Click **"Generate Domain"**
4. Copy your backend URL (e.g., `https://backend-production-xxxx.up.railway.app`)

### Step 5: Deploy
Railway will automatically deploy. Wait for the deployment to complete (you'll see logs).

---

## Frontend Deployment

### Step 1: Add Frontend Service
1. In your Railway project, click **"New Service"**
2. Select **"GitHub Repo"** (same repo)
3. Configure the service:
   - **Service Name**: `frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s build -l $PORT`

### Step 2: Add Frontend Environment Variable
1. Click on your frontend service
2. Go to **"Variables"** tab
3. Add variable:
   - **Variable**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.up.railway.app/api/v1`
   (Replace with your actual backend URL from Step 4 above)

### Step 3: Install Serve Package
Railway needs `serve` to host the React build. Add it to your frontend package.json dependencies or Railway will install it automatically.

Alternative: Update frontend service settings:
- **Start Command**: `npm install -g serve && serve -s build -l $PORT`

### Step 4: Generate Public Domain
1. In your frontend service, go to **"Settings"**
2. Scroll to **"Networking"**
3. Click **"Generate Domain"**
4. Copy your frontend URL

### Step 5: Deploy
Railway will auto-deploy the frontend.

---

## Verification

After both services are deployed:

1. **Test Backend**:
   - Visit: `https://your-backend.up.railway.app/`
   - Should show: API info message
   - Visit: `https://your-backend.up.railway.app/api/health`
   - Should show: `{"status": "OK", ...}`

2. **Test Frontend**:
   - Visit: `https://your-frontend.up.railway.app/`
   - Should load your React app
   - Try logging in to test the connection

---

## Important Notes

✅ **Auto-Deploy**: Railway automatically redeploys when you push to GitHub
✅ **Environment Variables**: Already configured, no need to update `.env` files
✅ **MongoDB**: Railway has better MongoDB connection handling than Vercel
✅ **Logs**: Click on any service → "Deployments" to view real-time logs
✅ **Free Tier**: Railway gives you $5 free credit per month (enough for small projects)

---

## Troubleshooting

### If backend fails to start:
1. Check logs: Service → Deployments → Click on deployment → View logs
2. Make sure `DB_CONNECTION_STRING` is correct
3. Verify MongoDB Atlas allows 0.0.0.0/0 in Network Access

### If frontend can't connect to backend:
1. Make sure `REACT_APP_API_URL` points to correct backend domain
2. Redeploy frontend after updating the variable
3. Check CORS is enabled in backend (already configured in your code)

### To view logs:
1. Click on service (backend or frontend)
2. Click "Deployments" tab
3. Click on latest deployment
4. View real-time logs

---

## After Deployment

Your app will be live at:
- **Backend**: `https://backend-production-xxxx.up.railway.app`
- **Frontend**: `https://frontend-production-xxxx.up.railway.app`

You can now use the Postman collection with your Railway backend URL! 🚀

---

## Cost

Railway free tier includes:
- $5 free credit per month
- Automatically scales based on usage
- If you exceed free tier, you'll need to add a payment method

For a student project like this, the free tier should be more than enough!
