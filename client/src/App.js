import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Projects from './views/Projects';
import Project from './views/Project';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Projects} />
      <Route path="/projects/:id" component={Project} />
    </div>
  );
}

export default App;
