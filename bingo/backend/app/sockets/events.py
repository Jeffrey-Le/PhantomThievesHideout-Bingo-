import random

from flask import request, redirect, session
from flask_socketio import emit, join_room, leave_room, send, rooms

from ..extensions import socketio

from string import ascii_uppercase

roomsCode = {}
users = []

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

    user2 = {'code': 0, 'name': 'Guest 2', 'sid': request.sid, 'team': 'red'}
    user3 = {'code': 0, 'name': 'Guest 3', 'sid': request.sid, 'team': 'green'}

    currentUsers = [user2, user3]

    emit('connected')
    #emit('userConnected', currentUsers)

@socketio.on('forceDisconnect')
def forceDisconnect(sid, roomCode):
    print('User Disconnected')
    print(sid)
    print(roomCode)
    user = next((x for x in users if x['sid'] == sid), None)
    print(user)
    users.remove(user)
    print(users)
    emit('userDisconnect', users, to=roomCode)


@socketio.on('createRoom')
def handleRoomCreation(user):
    print('Creating Room!')
    code = generateUniqueCode(4)

    roomsCode[f'{request.sid}'] = code
    print(f'RoomsCode: {roomsCode}')

    #join_room(code)

    print('Room Code: ', code)
    print(f'User: {user}')
    user['name']='Guest 1 (Host)'
    users.append(user)
    #print(rooms(sid=request.sid))
    emit('redirect', (user, code))

@socketio.on('joinRoom')
def handleJoin(user, code):
    print('Checking Rooms')
    if (code in roomsCode.values()):
        print('Joining Room')

        print(code)

        join_room(code)
        user['name']='Guest 2'
        print(f'RoomsCode: {roomsCode}')
        users.append(user)
        send({"name": f'{user["name"]}', "message": 'has joined the room'},  to=code)

        #print(f'{jsonData["name"]} joined room {code}')

        emit('redirect', (user, code))
    else:
        emit('error')

@socketio.on('redirect')
def handleRedirect():
    emit('redirect')

@socketio.on('userConnect')
def handleUserConnection(sid, roomCode):
    print(f'users: {users}')
    '''
    user = next((obj for obj in users if obj.sid == sid), None)
    print('UserConnected')
    send({"name": f'{user["name"]}', "message": 'has joined the room'},  to=user["code"])
    print(user["name"], user["code"])
    '''
    join_room(roomCode)
    emit('userConnected', users)

@socketio.on('signalBoard')
def handleBoardSignal():
    print('signalBoard')
    emit('signaledBoard')

@socketio.on('loadBoard')
def handleBoardLoading(roomCode, boardBoxes):
    print('helloLoadBoard')
    print(f'boardBoxes: {boardBoxes}')

    emit('loadBoard', boardBoxes, to=roomCode, include_self=False)

@socketio.on('changeTeam')
def handleTeamChange(members, roomCode, teamBoxes):
    print('helloTeamChange')
    print(f'TeamBoxes: {teamBoxes}')
    users[:] = members[:]
    print(members)

    emit('changeTeam', teamBoxes, to=roomCode, include_self=False)
