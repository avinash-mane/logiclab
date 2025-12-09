# LogicLab - Student Registration + Demo Class Booking System

A full-stack web application for LogicLab institute's student registration and demo class booking, built with React and Supabase. Uses Supabase directly from the frontend - no backend server required!

## 🚀 Features

- **Beautiful Homepage**: Showcase of courses with modern, responsive design
- **Registration Form**: Complete form with validation for student registration
- **Admin Login**: Secure admin authentication system
- **Admin Dashboard**: View all student registrations in a beautiful table with search functionality
- **Direct Supabase Integration**: No backend needed - all operations use Supabase client directly
- **Mobile Responsive**: Works perfectly on all devices
- **Professional UI**: Modern gradient design with smooth animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project in [Supabase](https://supabase.com)
2. Go to SQL Editor and run the following SQL to create the `students` table:

```sql
CREATE TABLE students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  timing TEXT NOT NULL,
  topic TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Get your Supabase credentials from Project Settings > API:
   - **Project URL** (for `VITE_SUPABASE_URL`)
   - **anon/public key** (for `VITE_SUPABASE_ANON_KEY`)
   
   **Note:** Service role key is NOT needed - we use only the anon key with RLS policies

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Credentials (change these in production!)
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123
```

**Note:** 
- All environment variables must start with `VITE_` to be accessible in the frontend.
- Service role key is NOT needed - we use only the anon key with RLS policies for security.

### 4. Run the Application

```bash
npm run dev
```

This will start the frontend development server on `http://localhost:3000`

### 5. Open in Browser

Navigate to `http://localhost:3000` in your browser.

### 6. Access Admin Dashboard

1. Click the **"Admin Login"** button on the homepage (top right)
2. Use the default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. After login, you'll see the admin dashboard with all student registrations
4. You can search, filter, and view all submitted forms in a table format

## 📁 Project Structure

```
class/
├── src/
│   ├── components/
│   │   ├── Homepage.jsx
│   │   ├── Homepage.css
│   │   ├── RegistrationForm.jsx
│   │   ├── RegistrationForm.css
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── AdminDashboard.jsx
│   │   └── AdminDashboard.css
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── vite.config.js
├── package.json
├── .env.example
├── supabase-setup.sql
└── README.md
```

## 🎨 Features Breakdown

### Homepage
- Hero section with call-to-action
- Course showcase (8 courses)
- Features section
- Responsive grid layouts

### Registration Form
- Form fields: Name, Phone, Email, Timing, Topic
- Client-side validation
- Success/error messages
- Loading states
- Back to homepage button

### Admin Dashboard
- Login page with secure authentication
- View all student registrations in a table
- Search functionality (by name, email, phone, topic)
- Statistics cards (total students, monthly registrations)
- Responsive table design
- Logout functionality

### Supabase Integration
- **Registration Form**: Inserts student data directly into Supabase `students` table using anon key
- **Admin Dashboard**: Fetches all students using anon key with RLS policies
- **No Backend Required**: All operations happen directly from the frontend
- **Client-side Authentication**: Simple password-based admin login
- **Security**: Uses only anon key (service role key cannot be used in browser)

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Mobile Responsive

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (480px - 767px)
- Small Mobile (< 480px)

## 🛡️ Security Notes

- Never commit `.env` file to version control
- **We use only the anon key** - Service role key is NOT used in the browser (Supabase blocks this for security)
- **RLS Policies** - The SQL setup includes policies for INSERT (public) and SELECT (public). For production:
  - Consider using Supabase Auth for admin authentication
  - Restrict SELECT policy to authenticated admin users only
  - Implement proper user roles and permissions
- **Change default admin credentials in production!**
- Admin session is stored in localStorage (consider using httpOnly cookies in production)
- Current setup allows public read access - suitable for demo, but restrict for production use

## 📝 License

This project is open source and available for educational purposes.

