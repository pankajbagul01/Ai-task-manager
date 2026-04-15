require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-task-manager';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connection established');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    // Don't exit immediately, retry pattern or just warn, but for local dev this is fine
    console.warn('Ensure MongoDB is running locally or provide a valid Atlas URI in .env');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} without DB connection (Expect API failures)`);
    });
  }
};

connectDB();
