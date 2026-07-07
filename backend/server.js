const express = require('express');
const apiRoutes = require('./routes/api');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000 // 5 second mein timeout hoga agar connect nahi hua
})
.then(() => console.log("Database connected successfully!"))
.catch(err => {
  console.error("Connection Error Details:", err.message);
});

app.use('/api', apiRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));