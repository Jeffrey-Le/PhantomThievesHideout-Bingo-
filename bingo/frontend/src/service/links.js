
export const bingoCards = `http://127.0.0.1:5000//card`;

export const singleBingoCard =  (type, value) => {return `http://127.0.0.1:5000/card/${type}=${value}`};

export const allChallenges = `http://127.0.0.1:5000//challenge`;

export const randomSingleChallenge = `http://127.0.0.1:5000//challenge/random`;

export const numChallenges = (amount) => {return `http://127.0.0.1:5000//challenge/random/${amount}`};

export const bingoSetChallenges = (challengeID) => {return `http://127.0.0.1:5000//challenge/set/${challengeID}`};
