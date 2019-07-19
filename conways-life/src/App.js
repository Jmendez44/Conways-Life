import React from 'react';
import './App.css';
import Game from './Components/MainComponent';
import GBA from './assets/gba.png'
import Grid from './Components/Grid';
import Main from './Components/Prac';

function App() {
  return (
    <div className="App">
      
      <Game />
      {/* <img className="gba" src={GBA} alt="GBA" /> */}
      
      {/* <Grid /> */}
      {/* <Main /> */}
    </div>
  );
}

export default App;
