from app import create_app, socketio
import eventlet

eventlet.monkey_patch()

app = create_app()

if __name__ == '__main__':
   socketio.run(app, debug=True)