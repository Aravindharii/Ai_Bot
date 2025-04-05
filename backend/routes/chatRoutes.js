const express = require('express');
const axios = require('axios');
const { handleTaskCommand } = require('../utils/taskRouter');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const userMessage = req.body.message;
  const express = require('express');
  const axios = require('axios');
  const { handleTaskCommand } = require('../utils/taskRouter');
  require('dotenv').config();
  
  const router = express.Router();
  
  router.post('/', async (req, res) => {
    const userMessage = req.body.message;
  
    // Handle math and task-based commands first
    const localResponse = handleTaskCommand(userMessage);
    if (localResponse) {
      return res.json({ reply: localResponse });
    }
  
    // Fallback to Together AI - DeepSeek Distilled Model
    try {
      const hfResponse = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free',
          messages: [{ role: 'user', content: userMessage }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000', // optional but good for rate limits
            'X-Title': 'HybridChatbot',              // optional but recommended
          },
        }
      );
  
      console.log('TogetherAI response:', hfResponse.data);
  
      const generated = hfResponse.data.choices[0]?.message?.content?.trim() || "Sorry, I didn't understand that.";
      res.json({ reply: generated });
    } catch (error) {
      console.error('Together AI API Error:', error.response?.data || error.message);
      res.json({ reply: '❌ Error contacting language model.' });
    }
  });
  
  module.exports = router;
  
  // Handle math and task-based commands first
  const localResponse = handleTaskCommand(userMessage);
  if (localResponse) {
    return res.json({ reply: localResponse });
  }

  // Fallback to OpenRouter (LLaMA 3)
  try {
    const hfResponse = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'meta-llama/llama-3-70b-instruct',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'HybridChatbot',
        },
      }
    );

    console.log('OpenRouter response:', hfResponse.data);

    const generated = hfResponse.data.choices[0]?.message?.content?.trim() || "Sorry, I didn't understand that.";
    res.json({ reply: generated });
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    res.json({ reply: '❌ Error contacting language model.' });
  }
});

module.exports = router;
