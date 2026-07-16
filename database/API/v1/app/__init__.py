from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://alejandroucaflorencio:Alejandro2605@cluster0.z6atxqa.mongodb.net/"
app.config["DB_NAME"] = "tienda_ropa"

try:
    client = MongoClient(app.config["MONGO_URI"])
    db = client[app.config["DB_NAME"]]
    print("¡Conexión exitosa a MongoDB Atlas!")
except Exception as e:  # pylint: disable=broad-exception-caught
    print(f"Error al conectar a MongoDB: {e}")

from app import index  # noqa: E402,F401  pylint: disable=wrong-import-position
