# 🚀 Firebase Hosting Deployment Guide

## Deployment Status

Your Mentneo AI frontend is ready to deploy to Firebase Hosting!

---

## Prerequisites

✅ Firebase CLI installed (v15.15.0)
✅ Frontend built (`npm run build`)
✅ Firebase project created (mentneo-ai)
✅ Configuration files ready

---

## Deployment Steps

### Step 1: Authenticate with Firebase

```bash
firebase login
```

This will open a browser window to authenticate your Google account.

### Step 2: Deploy to Firebase Hosting

```bash
firebase deploy
```

This will:
- Upload your frontend build to Firebase Hosting
- Configure routing for SPA
- Set up caching headers
- Deploy in seconds

### Step 3: Access Your Live Site

After deployment, you'll see:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/mentneo-ai
Hosting URL: https://mentneo-ai.web.app
```

Visit: **https://mentneo-ai.web.app**

---

## Configuration Files

### firebase.json
- Specifies hosting directory: `frontend/dist`
- Configures SPA routing (all routes → index.html)
- Sets up caching headers for assets
- Ignores node_modules and hidden files

### .firebaserc
- Project ID: `mentneo-ai`
- Default project configuration

---

## What Gets Deployed

✅ **Frontend Build** - Optimized React app
✅ **Static Assets** - CSS, JS, images
✅ **SPA Routing** - All routes handled by index.html
✅ **Caching** - Optimized for performance
✅ **HTTPS** - Automatic SSL certificate
✅ **CDN** - Global content delivery

---

## Environment Variables

Your frontend uses these environment variables:

```env
VITE_API_URL=http://localhost:5001
VITE_FIREBASE_API_KEY=AIzaSyDMys0wMpQIJK-43TLgrY2LaJcSe-qEybc
VITE_FIREBASE_AUTH_DOMAIN=mentneo-ai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mentneo-ai
VITE_FIREBASE_STORAGE_BUCKET=mentneo-ai.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=54893009505
VITE_FIREBASE_APP_ID=1:54893009505:web:920133522ca8a4452ba820
VITE_FIREBASE_MEASUREMENT_ID=G-VFCPQELM5P
```

For production, update `VITE_API_URL` to your backend URL.

---

## Backend Deployment

Your backend can be deployed to:

### Option 1: Railway (Recommended)
```bash
npm install -g railway
railway login
railway up
```

### Option 2: Heroku
```bash
heroku create mentneo-ai-backend
git push heroku main
```

### Option 3: Google Cloud Run
```bash
gcloud run deploy mentneo-ai-backend --source .
```

---

## Post-Deployment

### 1. Update Backend URL
After deploying backend, update frontend environment:

```env
VITE_API_URL=https://your-backend-url.com
```

Then rebuild and redeploy:
```bash
npm run build
firebase deploy
```

### 2. Configure Firestore Security Rules

Go to Firebase Console → Firestore → Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /videoRequests/{requestId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /videos/{videoId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.creatorId;
    }
  }
}
```

### 3. Configure Storage Rules

Go to Firebase Console → Storage → Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /profiles/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

### 4. Enable Authentication Methods

Go to Firebase Console → Authentication → Sign-in method

Enable:
- ✅ Email/Password
- ✅ Phone Number
- ✅ Google
- ✅ GitHub (optional)

### 5. Set Up Custom Domain (Optional)

Go to Firebase Console → Hosting → Custom domain

Add your domain (e.g., mentneo.ai)

---

## Monitoring & Analytics

### Firebase Console
- **URL:** https://console.firebase.google.com/project/mentneo-ai
- **Hosting:** View deployment history, traffic, performance
- **Analytics:** Track user behavior
- **Firestore:** Monitor database usage
- **Storage:** Track file uploads

### Performance Monitoring
- Page load times
- Core Web Vitals
- Error tracking
- User engagement

---

## Troubleshooting

### Issue: "Permission denied" during deploy
**Solution:** Run `firebase login` again

### Issue: "Cannot find module" errors
**Solution:** Run `npm install` in frontend directory

### Issue: Blank page after deployment
**Solution:** Check browser console for errors, verify API URL

### Issue: Firebase functions not working
**Solution:** Deploy backend separately, update API URL

---

## Rollback

To rollback to a previous version:

```bash
firebase hosting:channels:list
firebase hosting:clone mentneo-ai production:v1
```

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm install && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: mentneo-ai
```

---

## Performance Optimization

### Already Configured
✅ Gzip compression
✅ Asset caching
✅ CDN delivery
✅ Minified JS/CSS
✅ Image optimization

### Additional Steps
- [ ] Enable HTTP/2 Push
- [ ] Set up service worker
- [ ] Implement lazy loading
- [ ] Optimize images further
- [ ] Enable Brotli compression

---

## Security

### Already Configured
✅ HTTPS/SSL
✅ DDoS protection
✅ Firewall rules
✅ Security headers

### Additional Steps
- [ ] Set up WAF rules
- [ ] Enable rate limiting
- [ ] Configure CORS
- [ ] Set CSP headers
- [ ] Enable 2FA for Firebase

---

## Cost Estimation

### Firebase Hosting (Free Tier)
- 10 GB/month storage
- 360 MB/day bandwidth
- Unlimited deployments

### Firestore (Free Tier)
- 1 GB storage
- 50,000 reads/day
- 20,000 writes/day

### Storage (Free Tier)
- 5 GB storage
- 1 GB/day download

---

## Next Steps

1. ✅ Build frontend
2. ✅ Configure firebase.json
3. ⏭️ Run `firebase login`
4. ⏭️ Run `firebase deploy`
5. ⏭️ Deploy backend
6. ⏭️ Update API URL
7. ⏭️ Configure security rules
8. ⏭️ Enable authentication
9. ⏭️ Monitor performance
10. ⏭️ Launch!

---

## Resources

- **Firebase Console:** https://console.firebase.google.com
- **Firebase Docs:** https://firebase.google.com/docs/hosting
- **Deployment Guide:** https://firebase.google.com/docs/hosting/quickstart
- **Performance Tips:** https://firebase.google.com/docs/hosting/performance-tips

---

## Support

- **Firebase Support:** https://firebase.google.com/support
- **GitHub Issues:** https://github.com/abhiyeduru/mentneo-ai/issues
- **Documentation:** See FIREBASE_INTEGRATION.md

---

**Ready to deploy?** Run `firebase deploy` now! 🚀
