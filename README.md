# ❤️ Heart Disease Severity Prediction

A Machine Learning-powered web application that predicts the severity of heart disease using clinical parameters. The project provides a FastAPI backend for model inference and a lightweight HTML/CSS/JavaScript frontend.

---

## 🚀 Features

- Multi-class Heart Disease Severity Prediction (Classes 0–4)
- FastAPI REST API
- Machine Learning Pipeline using Scikit-learn
- Automatic Missing Value Handling
- Feature Scaling
- One-Hot Encoding
- Logistic Regression Classifier
- Interactive Frontend
- Probability Distribution for all Classes
- Swagger API Documentation

---

## 🛠 Tech Stack

### Backend

- Python
- FastAPI
- Scikit-Learn
- Pandas
- NumPy
- Joblib

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 📂 Project Structure

```
heart_disease_classifier/

├── backend/
│   ├── data/
│   ├── models/
│   ├── src/
│   │   ├── app.py
│   │   └── train.py
│   └── requirements.txt
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🧠 Machine Learning Workflow

1. Load Dataset
2. Handle Missing Values
3. Encode Categorical Features
4. Scale Numerical Features
5. Train/Test Split
6. Train Logistic Regression Model
7. Evaluate Performance
8. Save Trained Model
9. Serve Predictions via FastAPI

---

## 📊 Model Pipeline

```
Patient Data
      │
      ▼
Missing Value Imputation
      │
      ▼
Feature Scaling
      │
      ▼
One-Hot Encoding
      │
      ▼
Logistic Regression
      │
      ▼
Prediction
```

---

## 📈 Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix

---

## ⚡ API Endpoints

### Home

```
GET /
```

Returns API status.

---

### Predict

```
POST /predict
```

### Request

```json
{
  "age": 63,
  "sex": "Male",
  "cp": "typical angina",
  "trestbps": 145,
  "chol": 233,
  "fbs": true,
  "restecg": "lv hypertrophy",
  "thalch": 150,
  "exang": false,
  "oldpeak": 2.3,
  "slope": "downsloping",
  "ca": 0,
  "thal": "fixed defect"
}
```

### Response

```json
{
  "class": 4,
  "severity": "Critical",
  "confidence": 43.96,
  "probabilities": [
    0.10,
    0.04,
    0.23,
    0.18,
    0.44
  ]
}
```

---

## 💻 Running Locally

### Clone Repository

```bash
git clone https://github.com/<username>/<repository>.git
```

### Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run API

```bash
python -m uvicorn src.app:app --reload
```

---

### Frontend

```bash
cd frontend

python -m http.server 5500
```

Open

```
http://localhost:5500
```

---

## 📚 Dataset

Heart Disease UCI Dataset

Features include:

- Age
- Sex
- Chest Pain Type
- Resting Blood Pressure
- Cholesterol
- Fasting Blood Sugar
- ECG Results
- Maximum Heart Rate
- Exercise Induced Angina
- ST Depression
- Slope
- Number of Major Vessels
- Thalassemia

Target:

```
0 → No Disease
1 → Mild
2 → Moderate
3 → Severe
4 → Critical
```

---

## 🔮 Future Improvements

- Random Forest & XGBoost Comparison
- Cross Validation
- Hyperparameter Tuning
- Feature Importance Visualization
- Prediction History
- User Authentication
- Docker Support
- CI/CD Pipeline
- Cloud Deployment

---

## 👨‍💻 Author

**Aman Agrahari**

Computer Science Engineering (Data Science)

Full Stack Developer | Machine Learning Enthusiast

GitHub: https://github.com/<your-github>

LinkedIn: https://linkedin.com/in/<your-linkedin>

---

⭐ If you found this project useful, consider giving it a star.