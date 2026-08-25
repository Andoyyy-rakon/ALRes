const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:3000');
}

app.use(cors({
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS Policy: Origin not allowed'));
  },
  credentials: true,
  exposedHeaders: ['Content-Disposition', 'Content-Length']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
