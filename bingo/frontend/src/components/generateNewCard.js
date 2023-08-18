import { useState } from "react";
import useSingleBingoCard from "../hooks/useSingleBingoCard";
import useNumChallenges from "../hooks/useNumChallenges";
import setBingoSet from "../hooks/setBingoSet";
import setBingoCard from "../hooks/setBingoCard";



function GenerateNewBingoCard(props) {
    const bingoPost = {
        seed: 11000
    }

    //setBingoCard(bingoPost);

    //const [challenges] = useNumChallenges([25]);

    //const [bingoCard] = useSingleBingoCard({seed: props.seed});

    const updatedID = {
        bingocard_id: 1
    };

    setBingoSet(3, updatedID);
}

export default GenerateNewBingoCard;