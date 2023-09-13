import random

from flask import request, redirect
from flask_socketio import emit, join_room, leave_room, send

from ..extensions import socketio

from string import ascii_uppercase

rooms = {}

def generateUniqueCode(length):
    while True:
        code =  ""
        for _ in range(length):
            code += random.choice(ascii_uppercase)

        if code not in rooms:
            break

    return code

@socketio.on('connect')
def handleConenct():
    print(request.sid)
    print("Client is connected")

@socketio.on('disconnect')
def disconnected():
    print('User Disconnected')
    emit("disconnect", f'user {request.sid} has been disconnected', broadcast=True)


@socketio.on('createRoom')
def handleRoomCreation():
    print('Creating Room!')
    code = generateUniqueCode(4)
    join_room(code)

    print('Room Code: ', code)
    jsonData = {'code': code}
    emit('createRoom', jsonData)

@socketio.on('joinRoom')
def handleJoin(code):
    print('Joining Room')
    join_room(code)

@socketio.on('redirect')
def handleRedirect():
    emit('redirect')
