import React from 'react';
import Summary from './charts/summary';
import './App.css';

function App() {
  return (
    <div className="App-header">
      <h1 className="font-mono tracking-widest dark:text-pink-500">All your Covid-19 information here</h1>
      <Summary/>
    </div>
  );
}

export default App;
