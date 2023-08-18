import { useState } from 'react'
import Card from './components/card';
import LobbyDeatils from './components/lobbyDetails';
import TeamDetails from './components/teamDetails';
import {CardData} from './components/cardData'
import Challenge from './components/challenge';
import StartButton from './components/startButton';
import GenerateNewBingoCard from './components/generateNewCard';
import './App.css';

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
      <Card/>
      <GenerateNewBingoCard seed={11000}/>
    </div>
    </>
  );
}

export default App;
