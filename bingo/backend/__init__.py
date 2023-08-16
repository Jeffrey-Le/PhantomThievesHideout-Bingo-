from dotenv import load_dotenv
import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from .extensions import db
from .routes import main

def create_app():

    load_dotenv()

    app = Flask(__name__)

    SQLpass = os.getenv("SQLPASSWORD")

    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://root:{SQLpass}@localhost/manhuntbingodb"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(main)

    return app