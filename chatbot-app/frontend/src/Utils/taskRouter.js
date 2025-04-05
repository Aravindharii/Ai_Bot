// utils/taskRouter.js
const { evaluate } = require('mathjs');

const handleTaskCommand = (input) => {
  const trimmed = input.trim().toLowerCase();

  if (trimmed.startsWith('calculate')) {
    const expression = input.replace(/calculate/i, '').trim();
    try {
      const result = evaluate(expression);
      return `🧮 Result: ${result}`;
    } catch {
      return `⚠️ Invalid math expression. Try something like: calculate 3 + 5 * 2`;
    }
  }

  // fallback
  return null;
};

module.exports = { handleTaskCommand };
