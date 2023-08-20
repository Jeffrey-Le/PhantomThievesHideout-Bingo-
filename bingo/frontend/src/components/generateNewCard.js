import { useState } from "react";

import useFetch from "../hooks/useFetch";

import { allChallenges, bingoCards, bingoSetChallenges } from "../service/links";


function GenerateNewBingoCard(props) {
    const bingoPost = {
        "seed": 2400
    }

    //setBingoCard(bingoPost);

    const [challenges] = useFetch(allChallenges);

    //const [postBingoCard] = useFetch(bingoCards, 'post', bingoPost);
    
    console.log(challenges);

    //const [challenges] = useNumChallenges([25]);

    //const [bingoCard] = useSingleBingoCard({seed: props.seed});

    //const updatedID = {
       // bingocard_id: 1
    //};

    //console.log(JSON.stringify(updatedID));

    //const [bingoSet] = useFetch(bingoSetChallenges(4), 'put', updatedID);

    //console.log(bingoSet);
}

export default GenerateNewBingoCard;