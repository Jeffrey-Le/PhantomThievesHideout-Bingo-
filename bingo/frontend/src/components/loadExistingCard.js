import { useState, useEffect, useRef } from "react";

import useFetch from "../hooks/useFetch";

import CreateBoard from "./card";

import { bingoCards, numRandomBingoCards } from "../service/links";

function LoadExistingCard() {
    const [cards, setCards, updateCards, appendCards] = useFetch(numRandomBingoCards(1));

    if (cards)
    {
        
    }

    
}

export default LoadExistingCard;