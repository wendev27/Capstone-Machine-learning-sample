# train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import json
import os

# --- Load exported data ---
data_path = os.path.join(os.path.dirname(__file__), "../ml_data/sensor_data.json")

if not os.path.exists(data_path):
    raise FileNotFoundError(f"⚠️ Cannot find {data_path}. Run exportData.mjs first!")

with open(data_path, "r") as f:
    raw_data = json.load(f)

# Convert JSON to DataFrame
df = pd.DataFrame(raw_data)

# --- Simulate a "status" column for demo ---
# You can later replace this logic with real labels if available
def label_status(row):
    if row["waterLevel"] > 80 or row["rainfall"] > 50:
        return "Flood Warning"
    elif row["waterLevel"] > 50 or row["rainfall"] > 20:
        return "Alert"
    else:
        return "Normal"

df["status"] = df.apply(label_status, axis=1)

# --- Select features and target ---
X = df[["rainfall", "waterLevel"]]
y = df["status"]

# --- Split data ---
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- Train the model ---
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# --- Evaluate ---
predictions = model.predict(X_test)
print("✅ Model trained successfully!")
print("Accuracy:", accuracy_score(y_test, predictions))
print("\nClassification Report:\n", classification_report(y_test, predictions))

# --- Save model ---
joblib.dump(model, os.path.join(os.path.dirname(__file__), "flood_model.pkl"))
print("💾 Model saved as flood_model.pkl")
