import random

from flask import request, redirect, session
from flask_socketio import emit, join_room, leave_room, send, rooms

from ..extensions import socketio, existingChallengesOne, existingChallengesTwo, currentBoardOne, currentBoardTwo
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
        hostUser = next((user for user in users if user['adminLevel'] == 2))
        hostSID = hostUser['sid']

        userToRemove = next((x for x in users if x['sid'] == request.sid), None)
        print(userToRemove)
        users.remove(userToRemove)

        send({"name": f'{userToRemove["name"]}', "message": ' has disconnected from the room'},  to=roomsCode[hostSID])

        if (userToRemove == hostUser):
            print('removing host user')
            currentBoardOne.clear()
            currentBoardTwo.clear()
            del roomsCode[roomsCode[hostSID]]

        leave_room(roomsCode[hostSID])

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
    #emit('loadBoard', existingChallenges, to=sid)

@socketio.on('updateExistingUsers')
def handleUpdateExistingUsers(updatedUsers, roomCode):
    users[:] = updatedUsers[:]
    emit('updateMembers', users, to=roomCode, include_self=False)


@socketio.on('signalBoard')
def handleBoardSignal(id):
    print('Signaling Board')
    emit('signaledBoard', id, to=request.sid)
    #emit('signaledBoardOne', id, to=request.sid)
    #emit('signaledBoardTwo', id, to=request.sid)

@socketio.on('updateBoard')
def handleBoardLoading(boardChallenges, roomCode, boardID):
    print('helloLoadBoard')
    #print('BoardBoxes: ', boardBoxes)
    match boardID:
        case 1:
            print('one')
            existingChallengesOne[:] = boardChallenges[:]
        case 2:
            print('two')
            existingChallengesTwo[:] = boardChallenges[:]

    emit('loadBoard', {"challenges": boardChallenges, "BoardID": boardID}, to=roomCode, include_self=False)

@socketio.on('loadBoard')
def handleBoardLoad(boardID):
    print(f'BoardID: {boardID}')
    match boardID:
        case 1:
            print('board1 Load')
            if (len(currentBoardOne) > 0):
                emit('changeBoard', {"boardBoxes": currentBoardOne, "boardID": boardID}, to=request.sid)
            else:
                emit('signaledBoard', boardID, to=request.sid)
        case 2:
            print('board2 Load')
            if (len(currentBoardTwo) > 0):
                emit('changeBoard', {"boardBoxes": currentBoardTwo, "boardID": boardID}, to=request.sid)
            else:
                emit('signaledBoard', boardID, to=request.sid)

@socketio.on('changeBoard')
def handleBoardChange(boardBoxes, boardID, roomCode):
    print(boardBoxes)
    match boardID:
        case 1:
            currentBoardOne[:] = boardBoxes[:]
        case 2:
            currentBoardTwo[:] = boardBoxes[:]

    emit('changeBoard', {"boardBoxes": boardBoxes, "boardID": boardID},to=roomCode, include_self=False)

@socketio.on('changeTeam')
def handleTeamChange(members, client, roomCode, teamBoxes):
    print('helloTeamChange')
    print(f'TeamBoxes: {teamBoxes}')
    
    for index, user in enumerate(users):
        if user['sid'] == client['sid']:
            users[index] = client

    print(f'Users After team Change: {users}')

    emit('changeTeam', teamBoxes, to=roomCode, include_self=False)

@socketio.on('updateMembers')
def handleMemberUpdate(members):
    users[:] = members[:]

@socketio.on('updateNewChallenges')
def handleChallengesUpdate(challenges, roomCode):
    emit('newChallenges', challenges, to=roomCode, include_self=False)