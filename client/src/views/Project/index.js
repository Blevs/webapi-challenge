import React, { useState, useEffect } from 'react';
import * as api from '../../api';
import { Link } from 'react-router-dom';

const Project = (props) => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const id = props.match.params.id;
  useEffect(() => {
    api.getProject(id)
      .then(res => setProject(res.data))
      .catch(err => setError(err));
  }, [id]);
  if (project) {
    return (
      <div className="project">
        <Link to="/">Home</Link>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div className="actions">
          {project.actions.map(a => (
            <div className="action" key={a.id}>
              <h2>{a.name}</h2>
              <p>{a.description}</p>
              <p>{a.notes}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Project;
