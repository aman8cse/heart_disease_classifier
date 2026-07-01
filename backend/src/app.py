from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI(
    title="Heart Disease Classifier API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Patient(BaseModel):
    age: int
    sex: str
    cp: str
    trestbps: int
    chol: int
    fbs: bool
    restecg: str
    thalch: int
    exang: bool
    oldpeak: float
    slope: str
    ca: int
    thal: str

CLASS_NAMES = {
    0: "No Disease",
    1: "Mild",
    2: "Moderate",
    3: "Severe",
    4: "Critical"
}

model = joblib.load("models/heart_model.pkl")

@app.get("/")
def home():
    return {
        "message": "Heart Disease Classifier API is running!"
    }

@app.post("/predict")
def predict(patient: Patient):

    data = pd.DataFrame([patient.model_dump()])

    prediction = model.predict(data)
    probability = model.predict_proba(data)

    predicted_class = int(prediction[0])

    return {
        "class": predicted_class,
        "severity": CLASS_NAMES[predicted_class],
        "confidence": round(max(probability[0]) * 100, 2),
        "probabilities": probability[0].tolist()
    }