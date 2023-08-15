import { useState } from 'react'
import Card from './components/card';
import LobbyDeatils from './components/lobbyDetails';
import TeamDetails from './components/teamDetails';
import {CardData, GetRandomBingoCard} from './components/cardData'
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
      <Card/>
      <CardData/>
      <GetRandomBingoCard/>
    </div>
    </>
  );
}

export default App;
