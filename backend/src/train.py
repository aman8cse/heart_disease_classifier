import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# =====================
# LOAD DATA
# =====================

df = pd.read_csv("data/heart_disease_uci.csv")

# =====================
# REMOVE UNUSED COLUMNS
# =====================

df = df.drop(columns=["id", "dataset"])

# =====================
# FEATURES & LABEL
# =====================

X = df.drop(columns=["num"])
y = df["num"]

# =====================
# COLUMN TYPES
# =====================

categorical = X.select_dtypes(include="object").columns
numerical = X.select_dtypes(exclude="object").columns

# =====================
# TRAIN TEST SPLIT
# =====================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# =====================
# NUMERICAL PIPELINE
# =====================

numerical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

# =====================
# CATEGORICAL PIPELINE
# =====================

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

# =====================
# PREPROCESSOR
# =====================

preprocessor = ColumnTransformer([
    ("num", numerical_pipeline, numerical),
    ("cat", categorical_pipeline, categorical)
])

# =====================
# COMPLETE ML PIPELINE
# =====================

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", LogisticRegression(max_iter=1000, class_weight="balanced"))
])

# =====================
# TRAIN MODEL
# =====================

model.fit(X_train, y_train)

# =====================
# PREDICT
# =====================

predictions = model.predict(X_test)
probabilities = model.predict_proba(X_test)

# =====================
# EVALUATION
# =====================

from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

print("=" * 50)
print("Accuracy:", accuracy_score(y_test, predictions))

print("\nClassification Report")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix")
print(confusion_matrix(y_test, predictions))

# =====================
# SAVE MODEL
# =====================

import joblib

joblib.dump(model, "models/heart_model.pkl")

print("\nModel saved successfully!")