const express = require('express');
const router = express.Router();

const fooRouter = require('./foos.api')

router.use('/foos', fooRouter)

const jobsRouter = require('./jobs.api')
router.use('/jobs', jobsRouter)


module.exports = router;
