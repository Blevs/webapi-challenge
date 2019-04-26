import React, { useState, useEffect } from 'react';
import * as api from '../../api';

const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    api.getProjects()
      .then(res => setProjects(res.data))
      .catch(err => setError(err));
  }, []);
  return (
    <div className="projects">
      <h1>Projects</h1>
      {projects.map(p => (
        <div className="project" key={p.id}>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
