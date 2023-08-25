import { useState } from 'react'
import Card from './components/card';
import LobbyDeatils from './components/lobbyDetails';
import TeamDetails from './components/teamDetails';
import StartButton from './components/startButton';
import GenerateNewBingoCard from './components/generateNewCard';
import './App.css';
import LoadExistingCard from './components/loadExistingCard';

function Hi(props) {
  const {num} = props;
  return (
    <div>Hello Mom {num}</div>
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
      <LoadExistingCard/>
    </div>
    </>
  );
}

export default App;
