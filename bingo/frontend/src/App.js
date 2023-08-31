import { useState } from 'react'
import Card from './components/card';
import LobbyDeatils from './components/lobbyDetails';
import TeamDetails from './components/teamDetails';
import StartButton from './components/startButton';
import GenerateNewBingoCard from './components/generateNewCard';
import './App.css';
import LoadExistingCard from './components/loadExistingCard';

import { User, HostUser } from './components/user';

function Hi() {
  let normUser = new User();
  let hostUser = new HostUser();

  console.log(normUser);
  console.log(hostUser);

  return (
    <div>Hello Mom</div>
  )
}


function App() {

  const [number, setNumber] = useState(0);

  const add = () => {
    setNumber(number + 1);
  }

  return (
    <>
    <div className="App">
      <LobbyDeatils/>
      <TeamDetails/>
      <StartButton/>
      <div>
        <Hi/>
      </div>
    </div>
    </>
  );
}

export default App;
