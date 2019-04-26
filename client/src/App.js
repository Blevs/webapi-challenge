import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Projects from './views/Projects';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Projects} />
    </div>
  );
}

export default App;
