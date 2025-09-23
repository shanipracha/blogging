# 🚀 BlogHub Deployment Guide

This guide will walk you through deploying your BlogHub application to Vercel with Supabase as the backend.

## 📋 Prerequisites

- GitHub account
- Vercel account
- Supabase account
- Node.js installed locally

## 🗄️ Step 1: Set up Supabase

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/Login with GitHub
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - **Name**: `bloghub` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
7. Click "Create new project"

### 1.2 Set up Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `database-schema.sql`
3. Paste into the SQL Editor
4. Click **Run** to execute the schema

### 1.3 Configure Storage
1. Go to **Storage** in your Supabase dashboard
2. Create two buckets:
   - **Bucket Name**: `blog-images`
     - **Public**: ✅ Yes
     - **File size limit**: 10MB
     - **Allowed MIME types**: `image/*`
   - **Bucket Name**: `event-banners`
     - **Public**: ✅ Yes
     - **File size limit**: 10MB
     - **Allowed MIME types**: `image/*`

### 1.4 Set up Authentication
1. Go to **Authentication** > **Settings**
2. Enable **Email** authentication
3. Configure **Site URL**: `http://localhost:3000` (for development)
4. Add **Redirect URLs**:
   - `http://localhost:3000/admin`
   - `https://your-domain.vercel.app/admin`

### 1.5 Get API Keys
1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## 🚀 Step 2: Deploy to Vercel

### 2.1 Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: BlogHub complete blogging platform"

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/bloghub.git

# Push to GitHub
git push -u origin main
```

### 2.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 2.3 Add Environment Variables
In Vercel dashboard, go to **Settings** > **Environment Variables** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Production, Preview, Development |

### 2.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Your site will be live at `https://your-project.vercel.app`

## 🔧 Step 3: Post-Deployment Configuration

### 3.1 Update Supabase Settings
1. Go back to Supabase **Authentication** > **Settings**
2. Update **Site URL** to your Vercel domain:
   - `https://your-project.vercel.app`
3. Add **Redirect URLs**:
   - `https://your-project.vercel.app/admin`

### 3.2 Create Admin User
1. Go to **Authentication** > **Users** in Supabase
2. Click **"Add user"**
3. Enter admin email and password
4. Or use the signup form at `https://your-domain.vercel.app/admin/login`

### 3.3 Test Your Deployment
1. Visit your live site
2. Test all features:
   - ✅ Homepage loads
   - ✅ Blog listing works
   - ✅ Blog detail pages work
   - ✅ Events listing works
   - ✅ Admin login works
   - ✅ Admin dashboard loads

## 🎨 Step 4: Customization

### 4.1 Update Site Information
Edit `src/app/layout.tsx` to update:
- Site title
- Meta description
- Social media tags

### 4.2 Customize Colors
Edit `tailwind.config.js` to change:
- Primary colors
- Accent colors
- Theme colors

### 4.3 Add Content
1. Login to admin dashboard
2. Create blog posts
3. Add events
4. Manage categories

## 🔍 Step 5: Domain Setup (Optional)

### 5.1 Custom Domain
1. In Vercel dashboard, go to **Settings** > **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase redirect URLs

### 5.2 SSL Certificate
Vercel automatically provides SSL certificates for all domains.

## 📊 Step 6: Monitoring & Analytics

### 6.1 Vercel Analytics
1. Go to **Analytics** in Vercel dashboard
2. Enable Web Analytics
3. Monitor performance and usage

### 6.2 Supabase Monitoring
1. Check **Logs** in Supabase dashboard
2. Monitor **Database** performance
3. Review **Authentication** logs

## 🛠️ Troubleshooting

### Common Issues

**❌ Build Fails**
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors

**❌ Database Connection Issues**
- Verify Supabase URL and keys
- Check RLS policies are correct
- Ensure database schema is applied

**❌ Authentication Not Working**
- Verify redirect URLs in Supabase
- Check environment variables
- Ensure user exists in Supabase

**❌ Images Not Loading**
- Check Storage buckets are created
- Verify bucket policies allow public access
- Check image URLs are correct

### Getting Help
1. Check Vercel deployment logs
2. Review Supabase logs
3. Check browser console for errors
4. Verify all environment variables

## 🎉 Success!

Your BlogHub application is now live! 🚀

- **Public Site**: `https://your-domain.vercel.app`
- **Admin Dashboard**: `https://your-domain.vercel.app/admin`
- **Supabase Dashboard**: Your Supabase project dashboard

## 📈 Next Steps

1. **Add Content**: Create blog posts and events
2. **Customize**: Update colors, fonts, and branding
3. **SEO**: Add meta tags and optimize for search engines
4. **Analytics**: Set up Google Analytics or similar
5. **Backup**: Set up regular database backups
6. **Monitoring**: Set up error tracking and monitoring

---

**Need help?** Check the [README.md](./README.md) for more detailed information about the project structure and features.
