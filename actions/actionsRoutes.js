const express = require('express');
const actionModel = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  actionModel.get()
    .then(actions => res.status(200).json(actions))
    .catch(_err => res.status(500).json({message: "Error getting actions"}));
});

module.exports = router;
