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

@socketio.on('disconnect')
def handleDisconenct():
    print('User Disconnected')
    user = next((x for x in users if x['sid'] == request.sid), None)
    print(user)
    users.remove(user)
    print(users)

    hostSID = users[0].sid
    emit('updateMembers', users, to=roomsCode[hostSID])

@socketio.on('forceDisconnect')
def forceDisconnect(sid, roomCode):
    print('User Disconnected')
    print(sid)
    print(roomCode)
    user = next((x for x in users if x['sid'] == sid), None)
    print(user)
    users.remove(user)
    print(users)
    emit('updateMembers', users, to=roomCode)


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
    #users.append(user)
    #print(rooms(sid=request.sid))
    emit('redirect', (user, code))

@socketio.on('joinRoom')
def handleJoin(user, code):
    print('Checking Rooms')
    if (code in roomsCode.values()):
        print('Joining Room')

        join_room(code)
        print(f'Users joinRoom: {users}')
        
        usersLength = len(users)

        user['name']=f'Guest {usersLength+1}'

        emit('redirect', (user, code))
    else:
        emit('error')

@socketio.on('redirect')
def handleRedirect():
    emit('redirect')

@socketio.on('userConnect')
def handleUserConnection(user, sid, roomCode):
    print(f'users: {users}')

    join_room(roomCode)

    send({"name": f'{user["name"]}', "message": 'has joined the room'},  to=roomCode)
    
    emit('userConnected', users, to=roomCode)

@socketio.on('updateExistingUsers')
def handleUpdateExistingUsers(updatedUsers, roomCode):
    users[:] = updatedUsers[:]
    emit('updateMembers', users, to=roomCode)


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
