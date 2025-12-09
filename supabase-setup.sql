-- Create students table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  timing TEXT NOT NULL,
  topic TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create an index on email for faster lookups (optional)
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public inserts (for registration form)
-- This allows anyone to insert new student registrations
CREATE POLICY "Allow public inserts" ON students
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create a policy to allow public SELECT (for admin dashboard)
-- NOTE: This allows anyone to read all students. For production, 
-- use Supabase Auth and restrict this to authenticated admin users only
CREATE POLICY "Allow public select" ON students
  FOR SELECT
  TO anon, authenticated
  USING (true);

