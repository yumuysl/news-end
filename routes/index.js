const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ "message": 'hello word' });
});

module.exports = router;
