from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential, load_model
import numpy as np
from sklearn.model_selection import train_test_split
from dotenv import load_dotenv

load_dotenv()
import openai
import os



dataset = pd.read_pickle(r"C:\Users\DIVYANSH\OneDrive\Documents\merged_training.pkl")
train_data, test_data = train_test_split(dataset, test_size=0.2, random_state=42)
train_text = train_data['text']
tokenizer = Tokenizer()
tokenizer.fit_on_texts(train_text)
train_sequences = tokenizer.texts_to_sequences(train_text)
max_length = max([len(i) for i in train_sequences])

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
      return "Flask app is running!"

@app.route("/summarize", methods = ["POST"])
def summarize():
    data = request.get_json()
    openai.api_key = os.getenv('OPENAI_KEY')
    augmented_prompt = f"summarize this text: {data}"
    sum = openai.Completion.create(
      model="text-davinci-003",
      prompt=augmented_prompt,
      temperature=1,
      max_tokens=1000,
  )["choices"][0]["text"]
    response = jsonify({"message": f"{sum}"})
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response


@app.route("/submit-text", methods=["POST"])
def submit_text():
    data = request.get_json()
    text = data["text"]

    model = load_model(r"C:\Users\DIVYANSH\OneDrive\Documents\lstm_model.h5")
    text = pd.DataFrame([text])
    vector = tokenizer.texts_to_sequences(text[0])
    pad_sequence1 = pad_sequences(vector, maxlen = max_length)
    prediction = model.predict(pad_sequence1, verbose = "auto")
    predicted_class = np.argmax(prediction)
    emotion_list = ['sad', 'happy', 'love', 'anger', 'fear', 'surprise']
    predicted_emotion = emotion_list[predicted_class]
    response = jsonify({"message": f"{predicted_emotion}"})
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

if __name__ == '__main__':
 app.run()