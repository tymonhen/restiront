require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5025; // Changed port to 5025

app.use(cors());
app.use(express.json());

app.post('/summarize-taste-profile', async (req, res) => {
  try {
    const { name, allergies } = req.body;

    // Create a prompt for Claude to generate a haiku
    const prompt = `Summarize the taste profile for a user named ${name}. They have the following allergies: ${allergies}. Be specific about the type of cuisine the user likes, including spice tolerance, flavors the user enjoys, and any dietary restrictions. Be concise and to the point.`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages', // Adjust endpoint as needed
      {
        model: 'claude-3-haiku-20240307', // Ensure this is the correct model identifier
        max_tokens: 100, // Adjust as needed for haiku
        system: 'You are a restaurant picker assistant. Use the information given to generate a taste profile for the user.',
        messages: [
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    console.log('Claude response:', response.data);
    res.json({ summary: response.data.content[0].text });
    
  } catch (error) {
    console.error('Detailed backend error:', error.response?.data || error);
    res.status(500).json({ 
      error: 'Failed to get response from Claude',
      details: error.response?.data || error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 