# AmalJobs - Job Posting Website

A modern, responsive job posting website built with React, TypeScript, Tailwind CSS, and Supabase. Features categorized job sections, admin management, social sharing, and Google AdSense integration.

## Features

### Core Functionality

- **Admin-Only Job Management**: Secure admin panel for creating, editing, and deleting job postings
- **Job Categories**: Organized into Tech, Government, Non-Tech, and Internship sections
- **Advanced Search**: Filter jobs by keyword, location, and job type
- **Social Sharing**: Share jobs on Twitter, LinkedIn, Facebook, and via email
- **Automatic Expiration**: Jobs automatically expire after deadline
- **Responsive Design**: Works perfectly on all devices

### Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Red Deadline Buttons**: Prominent deadline buttons with white text as specified
- **Hover Effects**: Interactive elements with subtle animations
- **Accessibility**: Full keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags and structured data for better search rankings

### Technical Features

- **Supabase Integration**: PostgreSQL database with Row Level Security
- **Authentication**: Secure admin login with email/password
- **Real-time Updates**: Automatic job expiration handling
- **Google AdSense**: Integrated for monetization
- **Netlify Hosting**: Optimized for deployment

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migrations in the `supabase/migrations/` folder
3. Set up authentication by enabling email/password in the Supabase dashboard
4. Create an admin user account

### 2. Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Supabase project URL and anon key
3. Add your Google AdSense client ID

### 3. Installation

```bash
npm install
npm run dev
```


### 4. Deployment

- Deploy to Netlify by connecting your GitHub repository
- Set environment variables in Netlify dashboard
- Update `ads.txt` with your actual AdSense publisher ID

## Database Schema

### Jobs Table

- `id` (uuid) - Primary key
- `title` (text) - Job title
- `company` (text) - Company name
- `location` (text) - Job location
- `category` (text) - Tech, Government, Non-Tech, or Internship
- `type` (text) - Full-Time, Part-Time, Contract, etc.
- `description` (text) - Job description
- `application_link` (text) - External application URL
- `deadline` (date) - Application deadline
- `posted_date` (timestamptz) - When job was posted
- `status` (text) - active or expired
- `featured` (boolean) - Whether job is featured

## Usage

### For Admins

1. Log in to the admin panel at `/admin`
2. Click "Add Job" to create a new posting
3. Fill in all required fields including category and deadline
4. Jobs automatically appear in the correct section
5. Edit or delete jobs as needed

### For Users

1. Browse jobs by category (All, Tech, Government, Non-Tech, Internship)
2. Use search filters to find specific opportunities
3. Click "Apply Now" to visit external application links
4. Share jobs using the social sharing buttons
5. Check deadline buttons to see application deadlines

## Customization

### Styling

- Modify `tailwind.config.js` for custom colors and spacing
- Update `src/index.css` for additional styling
- Colors can be changed in component files

### Categories

- Add new categories by updating the database schema
- Modify the category dropdown in `JobForm.tsx`
- Update section navigation in `Layout.tsx`

### Features

- Add new job fields by updating the database and forms
- Implement additional sharing platforms
- Add more advanced filtering options

## Support

For issues or questions:

1. Check the Supabase documentation
2. Review the React and TypeScript docs
3. Check Tailwind CSS documentation
4. Review the code comments for implementation details

## License

This project is licensed under the MIT License.
