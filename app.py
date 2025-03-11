from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

# Load the trained model (Ensure the file exists)
MODEL_PATH = "health_risk_model.pkl"

if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, "rb") as file:
        model = pickle.load(file)
    print("✅ Model loaded successfully!")
else:
    model = None
    print("❌ No model found! Please upload health_risk_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded. Please upload health_risk_model.pkl."})

    try:
        data = request.get_json()
        age = int(data['age'])
        lifestyle = int(data['lifestyle'])
        medical_history = int(data['medicalHistory'])
        
        # Prepare input for model
        input_features = np.array([[age, lifestyle, medical_history]])
        
        # Make prediction
        prediction = model.predict(input_features)
        
        # Map numeric prediction to labels
        risk_labels = {0: "Low", 1: "Medium", 2: "High"}
        risk_level = risk_labels[prediction[0]]
        
        return jsonify({"risk": risk_level})
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
