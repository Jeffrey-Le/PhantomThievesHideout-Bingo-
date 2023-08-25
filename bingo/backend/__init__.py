from dotenv import load_dotenv, find_dotenv
import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

from .extensions import db

from .bingoSetChallenge.routes import bingoSetChallenges
from .bingoCard.routes import bingoCard
from.challenge.routes import challenge

def create_app():

    load_dotenv('.env')

    app = Flask(__name__)
    CORS(app)

    SQLpass = os.environ.get("SQLPASSWORD")

    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://root:{SQLpass}@localhost/manhuntbingodb"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(bingoSetChallenges)
    app.register_blueprint(bingoCard)
    app.register_blueprint(challenge)

    return app