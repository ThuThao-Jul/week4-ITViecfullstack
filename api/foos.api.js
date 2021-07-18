const express = require('express');
const router = express.Router();

// Concept #1. C.R.U.D. a resource using R.E.S.T.

router.get('/', function(req, res, next) {
  res.status(200).json({ foos: ["spam", "ham", "eggs", "foo", "bar"] });
});

router.get("/:id", function (req, res, next) {
  res.status(200).json({ foo: 'individualFoo' });
});

router.post('/', function(req, res, next) {
  res.status(201).json({ foo: "newlyCreatedFoo" });
});

router.patch('/:id', function(req, res, next) {
  res.status(202).json({ foo: "updatedFoo" });
});

router.delete('/', function(req, res, next) {
  res.status(202).json({ foo: "deletedFoo" });
});

module.exports = router;
