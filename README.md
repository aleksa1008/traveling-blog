# 🌍 Travel Blog

A full-stack web application where travelers can share their adventures and experiences with a community of fellow explorers. Users must register and sign in to access travel stories and share their own journeys.

![Screenshot of the main page ](/main%20page%20ss.png "Screenshot")

[Check it out Here](https://the-traveling-blog-8ba305d43e79.herokuapp.com/)

## 📋 Overview

Travel Blog is a community-driven platform that allows registered users to:

- **Read travel stories** from other travelers around the world
- **Share their own experiences** by creating detailed blog posts
- **Manage their content** with edit and delete capabilities
- **Connect with other travelers** through a shared community space

**Important:** Only registered users can view travel stories. Visitors must create an account to access blog content.

## ✨ Features

### Authentication

- **Sign Up**: New users can create an account to start sharing their travel stories
- **Sign In**: Returning users can log in to access their account
- **Secure Sessions**: User authentication is maintained throughout the browsing session

### User Dashboard

- **Home Page**: Personalized dashboard showing the newest posts from the community
- **Navigation Bar**: Easy access to all features from any page

### Post Management

- **Create Posts**: Share your travel experiences with title, description, and optional images
- **Edit Posts**: Update your existing posts with new information
- **Delete Posts**: Remove posts you no longer want to share
- **View All Posts**: Browse through travel stories from other users

### Social Features

- **Community Feed**: Discover the latest travel stories from the community
- **Post Details**: Read full travel stories with descriptions and images

## 🎨 Application Structure

### Pages

#### Welcome Page

- Landing page with application branding
- Sign In and Sign Up buttons
- Brief description of the platform's purpose

#### Home Page (Authenticated Users)

- Navigation bar with options
- Latest posts feed
- Quick access to create new posts

#### New Post Page

- Form to create a new travel post
- Fields for title and description
- Image upload capability
- Submit button to publish

#### Edit Post Page

- Pre-filled form with existing post data
- Update and Delete options
- Cancel option to return without changes

#### Post Detail Page

- Full post view with title and description
- Author information
- Post images
- Navigation back to main feed

## 🛠️ Technology Stack

- **Frontend**: Modern web framework
- **Backend**: Server Actions
- **Database**: MongoDB
- **Authentication**: Secure user authentication system
- **File Storage**: Image upload and storage capability

## 🚀 Getting Started

### Prerequisites

- Node.js
- Database (MongoDB)
- Package manager

## 📱 User Flow

1. **New User**:

   - Visit welcome page
   - Click "Sign Up"
   - Create account with email and password
   - Redirected to home page

2. **Returning User**:

   - Visit welcome page
   - Click "Sign In"
   - Enter credentials
   - Access home page with personalized feed

3. **Creating a Post**:

   - Click "New Post" from navigation
   - Fill in title and description
   - Optionally add images
   - Click "Add New Post"
   - Post appears in community feed

4. **Managing Posts**:
   - Navigate to "Edit Post" from your posts
   - Update content or delete post
   - Changes reflected immediately

## 🔒 Security Features

- Password encryption
- Session management
- Protected routes (authentication required)
- Input validation

## 🎯 Future Enhancements

- Comment system on posts
- Like/favorite functionality
- Search and filter posts by location
- Follow/unfollow other travelers
- Notifications for new posts from followed users

**Happy Traveling! ✈️🗺️**
