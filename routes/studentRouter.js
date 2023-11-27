const express = require('express');
const { createStudent, getAll } = require('../controllers/studentController');

const router = express.Router();

router.post('/create', createStudent);

router.get('/all', getAll);

module.exports = router;