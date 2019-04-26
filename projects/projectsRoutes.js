const express = require('express');
const project = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  project.get()
    .then(projects => res.status(200).json(projects))
    .catch(_err => res.status(500).json({message: "Error getting project information"}));
});

module.exports = router;
