-- BlogHub Database Schema for Supabase (Fixed Version)
-- Run these SQL commands in your Supabase SQL Editor

-- Create Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) NOT NULL DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Blog Posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug VARCHAR(255) NOT NULL UNIQUE,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0
);

-- Create Events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  banner_image TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  organizer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create Comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Likes table
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_ip VARCHAR(45) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_post_id, user_ip)
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_comments_blog_post ON comments(blog_post_id);
CREATE INDEX idx_comments_approved ON comments(approved);
CREATE INDEX idx_likes_blog_post ON likes(blog_post_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Categories: Public read access
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Blog Posts: Public read access for published posts, admin write access
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admin can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Events: Public read access
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

-- Comments: Public read for approved comments, public insert
CREATE POLICY "Approved comments are viewable by everyone" ON comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can manage comments" ON comments
  FOR ALL USING (auth.role() = 'authenticated');

-- Likes: Public read and insert
CREATE POLICY "Likes are viewable by everyone" ON likes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert likes" ON likes
  FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO categories (name, slug, description, color) VALUES
('Technology', 'technology', 'Latest in tech and innovation', '#3B82F6'),
('Lifestyle', 'lifestyle', 'Life tips and personal stories', '#10B981'),
('Business', 'business', 'Business insights and strategies', '#F59E0B'),
('Travel', 'travel', 'Travel guides and experiences', '#EF4444'),
('Health', 'health', 'Health and wellness content', '#8B5CF6'),
('Education', 'education', 'Learning and development', '#06B6D4');

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, slug, category_id, tags, published) VALUES
(
  'Getting Started with Next.js 15',
  '<h2>Introduction</h2><p>Next.js 15 brings exciting new features and improvements...</p><h2>Key Features</h2><ul><li>App Router improvements</li><li>Better performance</li><li>Enhanced developer experience</li></ul>',
  'Learn about the latest features in Next.js 15 and how to get started with this powerful React framework.',
  'getting-started-nextjs-15',
  (SELECT id FROM categories WHERE slug = 'technology'),
  ARRAY['nextjs', 'react', 'javascript', 'web-development'],
  true
),
(
  'The Future of Remote Work',
  '<h2>Remote Work Trends</h2><p>The landscape of work has changed dramatically...</p><h2>Benefits</h2><ul><li>Flexibility</li><li>Work-life balance</li><li>Cost savings</li></ul>',
  'Explore the evolving world of remote work and what the future holds for distributed teams.',
  'future-remote-work',
  (SELECT id FROM categories WHERE slug = 'business'),
  ARRAY['remote-work', 'business', 'productivity'],
  true
);

-- Insert sample events
INSERT INTO events (name, description, event_date, event_time, location, max_attendees) VALUES
(
  'Web Development Workshop',
  '<h2>Learn Modern Web Development</h2><p>Join us for an intensive workshop covering the latest web development technologies...</p><h2>What You''ll Learn</h2><ul><li>React and Next.js</li><li>Database design</li><li>Deployment strategies</li></ul>',
  '2024-12-15',
  '10:00:00',
  'Tech Hub, New York',
  50
),
(
  'Digital Marketing Summit',
  '<h2>Master Digital Marketing</h2><p>Connect with industry experts and learn the latest digital marketing strategies...</p>',
  '2024-12-20',
  '09:00:00',
  'Convention Center, San Francisco',
  200
);
