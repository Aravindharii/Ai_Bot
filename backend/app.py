from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load a smaller, faster chatbot model
chatbot = pipeline("text2text-generation", model="google/flan-t5-small")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"reply": "Please enter a message."}), 400

    # Generate bot response
    response = chatbot(user_input, max_length=100)
    bot_reply = response[0]["generated_text"]  # Extract response text

    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
