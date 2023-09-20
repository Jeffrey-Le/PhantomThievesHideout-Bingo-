import random

from flask import request, redirect, session
from flask_socketio import emit, join_room, leave_room, send, rooms

from ..extensions import socketio

from string import ascii_uppercase

roomsCode = {}
users = {}

def generateUniqueCode(length):
    while True:
        code =  ""
        for _ in range(length):
            code += random.choice(ascii_uppercase)

        if code not in roomsCode:
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

    roomsCode[f'{request.sid}'] = code
    print(roomsCode)

    join_room(code)

    print('Room Code: ', code)
    jsonData = {'code': code, 'name': 'Guest 1 (Host)', 'sid': request.sid}
    print(rooms(sid=request.sid))
    emit('createRoom', jsonData)

@socketio.on('joinRoom')
def handleJoin(code):
    print('Checking Rooms')
    if (code in roomsCode.values()):
        print('Joining Room')

        print(code)

        join_room(code)
        jsonData = {'code': code, 'name': 'Guest 2', 'sid': request.sid}
        print(roomsCode)
        users[f'{request.sid}'] = jsonData
        send({"name": f'{jsonData["name"]}', "message": 'has joined the room'},  to=code)

        print(f'{jsonData["name"]} joined room {code}')

        emit('joinRoom', jsonData)
    else:
        emit('error')

@socketio.on('redirect')
def handleRedirect():
    emit('redirect')

@socketio.on('userConnected')
def handleUserConnection(sid):
    user = users[sid]
    print('UserConnected')
    send({"name": f'{user["name"]}', "message": 'has joined the room'},  to=user["code"])
    print(user["name"], user["code"])
    emit('userConnected')
