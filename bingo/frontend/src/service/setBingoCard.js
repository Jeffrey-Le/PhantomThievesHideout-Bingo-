import axios from "axios";

async function setBingoCard(valueToPost) {
    try {
        const url = `http://127.0.0.1:5000//card`;
        
        const response = await axios.post(url, valueToPost);

        return response.data;

    } catch (err) {
        console.log(err);
        return [];
    }
}

export default setBingoCard;