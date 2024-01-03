import {io} from"socket.io-client";

const socket = io("http://54.145.245.65:8000/", {
	autoConnect: false,
	withCredentials: true,
	cors: {
		origin: "http://54.145.245.65:80",
	},
});

export default socket;
