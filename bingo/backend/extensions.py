from flask import Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Defaults
db = SQLAlchemy()
ma = Marshmallow()