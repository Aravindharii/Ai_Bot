// src/utils/taskHandlers.js

let todos = []; // In-memory todo list

export const taskHandlers = {
  todo: (data) => {
    if (data.action === "add") {
      todos.push(data.task);
      return `✅ Added todo: "${data.task}"`;
    } else if (data.action === "show") {
      return todos.length
        ? `📝 Your todos:\n- ${todos.join("\n- ")}`
        : "No todos found.";
    }
  },

  calculator: (data) => {
    try {
      const result = eval(data.expression); // safe for basic demo
      return `🧮 Result: ${result}`;
    } catch {
      return "❌ Invalid math expression.";
    }
  },

  weather: () => {
    return "🌤️ The weather is sunny (mock data).";
  },

  greet: () => {
    return "👋 Hello! How can I assist you today?";
  },

  help: () => {
    return `🛠️ Available commands:
- add todo [task]
- show todos
- calculate [expression]
- weather
- hello / hi
- help`;
  },

  llm: async (input) => {
    // Placeholder for LLM response
    return `🤖 This is a mock LLM response for: "${input}"`;
  }
};
