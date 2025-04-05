const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.TOGETHER_API_KEY;
const PORT = process.env.PORT || 5000;

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free',
        messages: [
          { role: 'system', content: 'You are Nova, a helpful and respectful AI assistant. Do not include <think> tags or internal thoughts. Only respond directly and clearly, in a friendly tone. Never mention DeepSeek or any creators.' },
          { role: 'user', content: message }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let reply = response.data.choices[0].message.content;

    // Strip out <think> tags or anything inside them, just in case
    reply = reply.replace(/<think>.*?<\/think>/gs, '').trim();

    res.json({ reply });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Nova server running at http://localhost:${PORT}`)
);
