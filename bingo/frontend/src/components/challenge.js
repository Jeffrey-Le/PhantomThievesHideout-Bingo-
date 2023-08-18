import {useState} from 'react'
import axios from 'axios'
import useNumChallenges from '../hooks/useNumChallenges'

function Challenge() {
    const [challenges] = useNumChallenges([25]);

    console.log(challenges);
}

export default Challenge;