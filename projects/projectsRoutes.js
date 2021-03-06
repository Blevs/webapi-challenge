const express = require('express');
const projectModel = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  projectModel.get()
    .then(projects => res.status(200).json(projects))
    .catch(_err => res.status(500).json({message: "Error getting project information"}));
});

router.post('/', (req, res) => {
  const project = req.body;
  if (project && project.name && project.description) {
    project.completed = project.completed || false;
    projectModel.insert(project)
      .then(project => res.status(201).json(project))
      .catch(_err => res.status(500).json({message: "Error creating project"}));
  } else {
    res.status(400).json({message: "Provide project name and description"});
  }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  projectModel.get(id)
    .then(project => project
          ? res.status(200).json(project)
          : res.status(404).json({message: "Project with give ID does not exist."}))
    .catch(_err => res.status(500).json({message: "Error getting project information"}));
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  projectModel.get(id)
    .then(project => project
          ? projectModel.remove(id)
          .then(removed => removed
                ? res.status(200).json(project)
                : (void 0).throwError())
          .catch(_err => res.status(500).json({message: "Error deleting project"}))
          : res.status(404).json({message: "Project with give ID does not exist."}))
    .catch(_err => res.status(500).json({message: "Error getting project information"}));
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const newProject = req.body;
  if (newProject && (newProject.name || newProject.description || newProject.completed)) {
  projectModel.get(id)
    .then(oldProject => oldProject
          ? projectModel.update(id, newProject)
          .then(updated => updated
                ? projectModel.get(id)
                .then(project => res.status(200).json(project))
                .catch(_err => res.status(500).json({
                  message: "Project updated, but an error occured while retrieving the project information."
                }))
                : (void 0).throwError())
          .catch(_err => res.status(500).json({message: "Error updating project"}))
          : res.status(404).json({message: "Project with give ID does not exist."}))
    .catch(_err => res.status(500).json({message: "Error getting project information"}));
  } else {
    res.status(400).json({message: "Provide changes to project"});
  }
});

router.get('/:id/actions', (req, res) => {
  const {id} = req.params;
  projectModel.get(id)
    .then(project => project
          ? projectModel.getProjectActions(id)
          .then(actions => res.status(200).json(actions))
          .catch(_err => res.status(500).json({message: "Error getting project actions"}))
          : res.status(404).json({message: "Project with give ID does not exist."}))
    .catch(_err => res.status(500).json({message: "Error getting project information"}));
});

module.exports = router;
