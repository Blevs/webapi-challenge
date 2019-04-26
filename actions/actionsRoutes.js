const express = require('express');
const actionModel = require('../data/helpers/actionModel.js');
const projectModel = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  actionModel.get()
    .then(actions => res.status(200).json(actions))
    .catch(_err => res.status(500).json({message: "Error getting actions"}));
});

router.post('/', (req, res) => {
  const action = req.body;
  if (action && action.project_id && action.description && action.notes) {
    if (action.description.length > 128) {
      res.status(400).json({message: "Action description must be under 128 characters"});
    } else {
    action.completed = action.completed || false;
    projectModel.get(action.project_id)
      .then(project => project
            ? actionModel.insert(action)
            .then(action => res.status(200).json(action))
            .catch(_err => res.status(500).json({message: "Error creating action"}))
            : res.status(400).json({message: "Project with ID does not exist"}))
      .catch(_err => res.status(500).json({message: "Error getting project"}));
    }
  } else {
    res.status(400).json({message: "Provide action project_id, description and notes"});
  }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  actionModel.get(id)
    .then(action => action
          ? res.status(200).json(action)
          : res.status(404).json({message: "Action with ID does not exist"}))
    .catch(_err => res.status(500).json({message: "Error getting actions"}));
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  actionModel.get(id)
    .then(action => actionModel.remove(id)
          .then(removed => removed
                ? res.status(200).json(action)
                : (void 0).throwError())
          .catch(_err => res.status(500).json({message: "Error removing action"})))
    .catch(_err => res.status(404).json({message: "Action with ID does not exist"}));
});


module.exports = router;
