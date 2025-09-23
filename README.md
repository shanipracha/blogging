# BlogHub - Complete Blogging & Events Platform

A modern, full-stack blogging and events platform built with **Next.js 15**, **Supabase**, and **Tailwind CSS**. Features a beautiful dark theme, responsive design, and comprehensive admin dashboard.

## 🚀 Features

### Public Features
- **Homepage** with latest blogs and upcoming events
- **Blog Listing** with search and category filtering
- **Blog Detail Pages** with comments and likes
- **Events Listing** with date/time/location details
- **Event Detail Pages** with RSVP functionality
- **About & Contact Pages**
- **Responsive Design** optimized for mobile and desktop
- **Dark Theme** with attractive accent colors

### Admin Features
- **Admin Dashboard** with statistics and quick actions
- **Blog Management** - Create, edit, delete blog posts
- **Event Management** - Create, edit, delete events
- **Comment Moderation** - Approve/reject comments
- **User Authentication** - Secure admin login
- **File Upload** - Store images in Supabase Storage

### Technical Features
- **Next.js 15** with App Router
- **Supabase** for database, authentication, and storage
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** with mobile-first approach
- **SEO Optimized** with proper meta tags
- **Production Ready** with clean code structure

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blogging
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Run the SQL schema from `database-schema.sql` in your Supabase SQL Editor

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

1. **Run the SQL Schema**
   - Copy the contents of `database-schema.sql`
   - Paste into your Supabase SQL Editor
   - Execute the script

2. **Set up Storage**
   - Go to Storage in your Supabase dashboard
   - Create buckets named `blog-images` and `event-banners`
   - Set appropriate policies for public access

3. **Configure Authentication**
   - Go to Authentication > Settings in Supabase
   - Enable email authentication
   - Create an admin user account

## 🚀 Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

3. **Deploy**
   - Click Deploy
   - Your site will be live at `https://your-project.vercel.app`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── blog/              # Blog pages
│   ├── events/            # Event pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Site footer
│   ├── BlogList.tsx       # Blog listing component
│   ├── CommentsSection.tsx # Comments component
│   └── ...
└── lib/                   # Utility functions
    ├── supabase.ts        # Supabase client
    └── supabase-server.ts # Server-side Supabase
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: {
    // Your primary colors
  },
  accent: {
    // Your accent colors
  }
}
```

### Content
- **Blog Posts**: Manage through admin dashboard
- **Events**: Create and manage events
- **Categories**: Add new categories in Supabase
- **Site Info**: Update in `src/app/layout.tsx`

## 🔧 Admin Access

1. **Create Admin User**
   - Sign up through the admin login page
   - Or create directly in Supabase Auth

2. **Access Admin Dashboard**
   - Go to `/admin/login`
   - Sign in with your credentials
   - Access the full admin panel

## 📱 Mobile Optimization

- **Responsive Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized images and code splitting
- **Mobile Navigation**: Collapsible menu for mobile

## 🔒 Security Features

- **Row Level Security**: Supabase RLS policies
- **Authentication**: Secure admin login
- **Input Validation**: Form validation and sanitization
- **CORS Protection**: Proper CORS configuration

## 🚀 Performance

- **Next.js 15**: Latest performance optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Supabase caching and CDN

## 📈 Analytics & Monitoring

- **Built-in Analytics**: Track views and engagement
- **Error Handling**: Comprehensive error boundaries
- **Logging**: Console logging for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the documentation
3. Contact support

## 🎯 Roadmap

- [ ] User registration and profiles
- [ ] Email notifications
- [ ] Advanced search functionality
- [ ] Social media integration
- [ ] Multi-language support
- [ ] API endpoints for mobile apps

---

**Built with ❤️ using Next.js and Supabase**

<!-- Updated for deployment -->