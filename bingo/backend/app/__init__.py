from dotenv import load_dotenv
import os

from flask import Flask
from flask_cors import CORS

from .extensions import db
from .sockets.events import socketio

from .api.bingoSetChallenge.routes import bingoSetChallenges
from .api.bingoCard.routes import bingoCard
from .api.challenge.routes import challenge

def create_app():

    load_dotenv('bingo/backend/.env')

    app = Flask(__name__, static_folder="bingo/frontend/build", static_url_path='/')
    CORS(app)

    SQLpass = os.environ.get("SQLPASSWORD")

    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://root:{SQLpass}@localhost/manhuntbingodb"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    app.register_blueprint(bingoSetChallenges)
    app.register_blueprint(bingoCard)
    app.register_blueprint(challenge)

    return app