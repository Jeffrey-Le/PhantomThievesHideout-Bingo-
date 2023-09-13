from backend import create_app, socketio
import eventlet

app = create_app()

if __name__ == '__main__':
   socketio.run(app, debug=True)