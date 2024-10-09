require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// Use environment variables for Flask API host and port
const flaskApiHost = process.env.FLASK_API_HOST;
const flaskApiPort = process.env.FLASK_API_PORT;

app.post('/api/run-python', async (req, res) => {
  const { input } = req.body;

  try {
    const response = await axios.post(`http://${flaskApiHost}:${flaskApiPort}/process`, {
      input: input,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/run-python:', error.message);
    res.status(500).json({
      error: true,
      message: 'Failed to communicate with the Flask API.',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});
