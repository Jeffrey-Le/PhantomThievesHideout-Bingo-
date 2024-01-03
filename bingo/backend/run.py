from app import create_app, socketio
import eventlet
from dotenv import load_dotenv

eventlet.monkey_patch()

load_dotenv(".env")

app = create_app()

print('Running Python Script')

if __name__ == '__main__':
    socketio.run(app, debug=True, host='127.0.0.1', port=8000)
