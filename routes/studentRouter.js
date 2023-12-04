const express = require('express');
const { createStudent, getAll, getOne, updateOne, deleteStudent, makeAdmin } = require('../controllers/studentController');
const requestInfo = require('../middleware/requestInfo');

const router = express.Router();

router.post('/create', requestInfo,createStudent);

router.get('/all', requestInfo, getAll);

router.get('/one/:id', requestInfo, getOne);

router.put('/update/:id', requestInfo, updateOne);

router.put('/makeadmin/:id', requestInfo, makeAdmin);

router.delete('/delete/:id', requestInfo, deleteStudent);

module.exports = router;