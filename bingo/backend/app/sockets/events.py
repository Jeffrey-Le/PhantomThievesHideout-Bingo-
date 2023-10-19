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


    emit('connected')

@socketio.on('disconnect')
def handleDisconenct():
    print('User Disconnected')

    if (len(users) > 0):
        userToRemove = next((x for x in users if x['sid'] == request.sid), None)
        print(userToRemove)
        users.remove(userToRemove)

        hostUser = next((user for user in users if user['adminLevel'] == 2))
        hostSID = hostUser['sid']

        send({"name": f'{userToRemove["name"]}', "message": ' has disconnected from the room'},  to=roomsCode[hostSID])

        emit('updateMembers', users, to=roomsCode[hostSID], include_self=False)
        emit('userDisconnect', userToRemove, to=roomsCode[hostSID], include_self=False)

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

        #join_room(code)
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
    join_room(roomCode)

    print(f'users: {users}')

    send({"name": f'{user["name"]}', "message": ' has joined the room'},  to=roomCode, include_self=False)
    
    emit('userConnected', users, to=sid)

@socketio.on('updateExistingUsers')
def handleUpdateExistingUsers(updatedUsers, roomCode):
    users[:] = updatedUsers[:]
    emit('updateMembers', users, to=roomCode, include_self=False)


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
def handleTeamChange(members, client, roomCode, teamBoxes):
    print('helloTeamChange')
    print(f'TeamBoxes: {teamBoxes}')
    
    for index, user in enumerate(users):
        if user['sid'] == client['sid']:
            users[index] = client

    '''
    for i in range(len(members)):
        users[i] = members[i]
    '''
    print(f'Users After team Change: {users}')

    emit('changeTeam', teamBoxes, to=roomCode, include_self=False)

@socketio.on('updateMembers')
def handleMemberUpdate(members):
    users[:] = members[:]
