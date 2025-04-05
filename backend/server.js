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
          {
            role: 'system',
            content: `Your name is Nova. You are a helpful, respectful assistant created by the Nova Team.
NEVER mention DeepSeek or DeepSeek-R1. NEVER say who made your model. NEVER say "I am DeepSeek-R1".
If the user asks who created you, say: "I was created by the Nova Team."`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'NovaChat',
        },
      }
    );

    // 🧹 Regex Filter to Force Remove Any Branding
    let raw = response.data.choices[0].message.content;

    const clean = raw
      .replace(/DeepSeek-R1/gi, 'Nova')
      .replace(/DeepSeek/gi, 'Nova')
      .replace(/created by [^\.\n]+/gi, 'created by the Nova Team')
      .replace(/I'm Nova[^\.]*\./gi, "I'm Nova.") // Normalize custom identity
      .replace(/I am DeepSeek[^\.]*\./gi, "I'm Nova.") // Remove fallback identity
      .replace(/Greetings!.*?(?=\n|$)/gi, '') // Remove that whole intro sentence
      .replace(/^\s+/, '') // Trim beginning whitespace
      .trim();

    res.json({ reply: clean });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
