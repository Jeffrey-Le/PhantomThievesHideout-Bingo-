
// Method: GET, POST
export const bingoCards = `http://127.0.0.1:5000//card`;

// Method: GET, PUT, DELETE
export const singleBingoCard =  (type, value) => {return `http://127.0.0.1:5000/card/${type}=${value}`};

// Method: GET
export const numRandomBingoCards = (amount) => {return `http://127.0.0.1:5000/card/random/${amount}`};

// Method: GET, POST
export const allChallenges = `http://127.0.0.1:5000//challenge`;

// Method: GET, PUT, DELETE
export const singleChallenge = (id) => {return `http://127.0.0.1:5000//challenge/${id}`};

// Method: GET
export const categoryChallenge = (category) => { return `http://127.0.0.1:5000//challenge/${category}`};

// Method: GET
export const numCategoryChallenges = (amount, category) => {return `http://127.0.0.1:5000//challenge/random/${amount}/${category}`}

// Method: GET
export const randomSingleChallenge = `http://127.0.0.1:5000//challenge/random`;

// Method: GET
export const numChallenges = (amount) => {return `http://127.0.0.1:5000//challenge/random/${amount}`};

// Method: GET
export const numSetChallenges = (amount) => {return `http://127.0.0.1:5000//challenge/set/amount=${amount}`}

// Method: GET, PUT, DELETE
export const bingoSetChallenges = (id) => {return `http://127.0.0.1:5000//challenge/set/id=${id}`};
