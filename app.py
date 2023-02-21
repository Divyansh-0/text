from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
      return "Flask app is running!"

@app.route("/submit-text", methods=["POST"])
def submit_text():
    data = request.get_json()
    text = data["text"]
  
    response = jsonify({"message": "Text received!"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run()