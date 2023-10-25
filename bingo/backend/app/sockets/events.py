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

    code = rooms(request.sid)[1]
    room = roomsCode[code]
    
    if (len(room['users']) > 0):
        print(room['users'])
        hostUser = next((user for user in room['users'] if user['adminLevel'] == 2), None)
        hostSID = hostUser['sid']

        userToRemove = next((x for x in room['users'] if x['sid'] == request.sid), None)
        room['users'].remove(userToRemove)

        send({"name": f'{userToRemove["name"]}', "message": ' has disconnected from the room'},  to=code)

        if (userToRemove == hostUser):
            print('removing host user')
            room['currentBoardOne'].clear()
            room['currentBoardTwo'].clear()
            del room

        leave_room(code)

        emit('updateMembers', room['users'], to=code, include_self=False)
        emit('userDisconnect', userToRemove, to=code, include_self=False)
        

@socketio.on('createRoom')
def handleRoomCreation(user):
    print('Creating Room!')
    code = generateUniqueCode(4)

    roomsCode[code] = {'users': [], 'currentBoardOne': [], 'currentBoardTwo': []}

    print('Room Code: ', code)
    print(f'User: {user}')
    user['name']='Guest 1 (Host)'

    emit('redirect', (user, code))

@socketio.on('joinRoom')
def handleJoin(user, code):
    print('Checking Rooms')
    if (code in roomsCode):
        usersLength = len(roomsCode[code]['users'])

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

    print(f'users: {roomsCode[roomCode]["users"]}')

    send({"name": f'{user["name"]}', "message": ' has joined the room'},  to=roomCode, include_self=False)
    print('users', roomsCode[roomCode]["users"])
    emit('userConnected', roomsCode[roomCode]["users"], to=sid)
    #emit('loadBoard', existingChallenges, to=sid)

@socketio.on('updateExistingUsers')
def handleUpdateExistingUsers(updatedUsers, roomCode):
    roomsCode[roomCode]["users"][:] = updatedUsers[:]
    emit('updateMembers', roomsCode[roomCode]["users"], to=roomCode, include_self=False)


@socketio.on('signalBoard')
def handleBoardSignal(id):
    print('Signaling Board')
    emit('signaledBoard', id, to=request.sid)

@socketio.on('updateBoard')
def handleBoardLoading(boardChallenges, roomCode, boardID):
    room = roomsCode[roomCode]
    cb1 = room['currentBoardOne']
    cb2 = room['currentBoardTwo']

    if (boardID == 1 and len(cb1) > 0):
        for i in range(len(cb1)):
            cb1[i]["item"] = boardChallenges[i]["challenge"]
            cb1[i]['teams'].clear()
        print(cb1)
        emit('changeBoard', {"boardBoxes": cb1, "BoardID": boardID}, to=roomCode, include_self=False)
    elif (boardID == 2 and len(cb2) > 0):
        for i in range(len(cb2)):
            cb2[i]["item"] = boardChallenges[i]["challenge"]
            cb2[i]['teams'].clear()
        print(cb2)
        emit('changeBoard', {"boardBoxes": cb2, "BoardID": boardID}, to=roomCode, include_self=False)
    else:
        emit('loadBoard', {"challenges": boardChallenges, "BoardID": boardID}, to=roomCode, include_self=False)

@socketio.on('loadBoard')
def handleBoardLoad(boardID, roomCode):
    room = roomsCode[roomCode]
    cb1 = room['currentBoardOne']
    cb2 = room['currentBoardTwo']

    match boardID:
        case 1:
            if (len(cb1) > 0):
                emit('changeBoard', {"boardBoxes": cb1, "boardID": boardID}, to=roomCode, include_self=True)
            else:
                emit('signaledBoard', boardID, to=request.sid)
        case 2:
            if (len(cb2) > 0):
                emit('changeBoard', {"boardBoxes": cb2, "boardID": boardID}, to=roomCode, include_self=True)
            else:
                emit('signaledBoard', boardID, to=request.sid)

@socketio.on('changeBoard')
def handleBoardChange(boardBoxes, boardID, roomCode):
    print(boardBoxes)
    match boardID:
        case 1:
            roomsCode[roomCode]['currentBoardOne'][:] = boardBoxes[:]
        case 2:
            roomsCode[roomCode]['currentBoardTwo'][:] = boardBoxes[:]

    emit('changeBoard', {"boardBoxes": boardBoxes, "boardID": boardID},to=roomCode, include_self=False)

@socketio.on('changeTeam')
def handleTeamChange(oldTeam, client, roomCode, teamBoxes):
    print(f'TeamBoxes: {teamBoxes}')
    emptyBoxes = []
    
    for index, user in enumerate(roomsCode[roomCode]["users"]):
        if user['sid'] == client['sid']:
            roomsCode[roomCode]["users"][index] = client

    for box in teamBoxes:
        if len(box["users"]) == 0:
            emptyBoxes.append(box["name"])

    print(users)

    emit('changeTeam', {"teamBoxes": teamBoxes, "emptyBoxes": emptyBoxes}, to=roomCode, include_self=True)
    #emit('clearEmptyTeams', oldTeam, to=roomCode, include_self=True)

@socketio.on('updateMembers')
def handleMemberUpdate(members):
    users[:] = members[:]

@socketio.on('updateNewChallenges')
def handleChallengesUpdate(challenges, roomCode):
    emit('newChallenges', challenges, to=roomCode, include_self=False)