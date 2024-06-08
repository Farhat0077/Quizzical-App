import React, { useState } from 'react';
import './App.css';
import Start from './assets/Componenets/StartPage';
import Questions from './assets/Componenets/Questions';
import Bubble from './assets/Componenets/Bubble';
function App() {


  const [isStart, setIsStart] = useState(true);

  const page = () => {
    setIsStart(!isStart);
  };

  return (
    <div>
      <Bubble/>
      
        {isStart ? (
          <Start showPage={page}/>) 
        : 
        ( 
          <Questions />
        )}
     
    </div>
  );
}

export default App;
