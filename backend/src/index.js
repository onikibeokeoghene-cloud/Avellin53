const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from parent directory if not found in current
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AVELLIN API is running' });
});

// Default route
app.get('/', (req, res) => {
  res.send('AVELLIN Backend Server');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
