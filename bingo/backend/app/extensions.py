from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_socketio import SocketIO

# Defaults
db = SQLAlchemy()
ma = Marshmallow()
socketio = SocketIO()

# Global Variables
existingChallengesOne = []
existingChallengesTwo = []

currentBoardOne = []
currentBoardTwo = []