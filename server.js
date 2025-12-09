import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client with service role key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// API Route: Register student
app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, email, timing, topic } = req.body;

    // Validation
    if (!name || !phone || !email || !timing || !topic) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          name,
          phone,
          email,
          timing,
          topic
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to register student. Please try again.' 
      });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Registration successful!', 
      data 
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Simple admin credentials (in production, use proper authentication)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-secret-token-2024';

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized. Please login.' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid token. Please login again.' 
    });
  }

  next();
};

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username and password are required' 
      });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.json({ 
        success: true, 
        message: 'Login successful',
        token: ADMIN_TOKEN
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Get all students (admin only)
app.get('/api/admin/students', verifyAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch students' 
      });
    }

    res.json({ 
      success: true, 
      data: data || []
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Admin credentials: ${ADMIN_USERNAME} / ${ADMIN_PASSWORD}`);
});

