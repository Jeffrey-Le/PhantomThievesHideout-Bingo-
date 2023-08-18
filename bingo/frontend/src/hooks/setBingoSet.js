import axios from "axios";

async function setBingoSet(challengeID, updatedCardID) {
    try {
        const url = `http://127.0.0.1:5000//challenge/set/${challengeID}`;
        
        const response = await axios.put(url, updatedCardID);
    
        return response.data;

    } catch (err) {
        console.log(err);
        return [];
    }
}

export default setBingoSet;