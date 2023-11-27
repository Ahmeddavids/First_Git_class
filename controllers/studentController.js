const studentModel = require('../models/studentModel');

exports.createStudent = async (req, res) => {
    try {
        const student = await studentModel.create(req.body);
        if(!student){
            res.status(400).json({
                message: 'Error creating student'
            })
        } else{
            res.status(201).json({
                message: 'Student created successfully',
                data: student
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const student = await studentModel.find();
        if(student.length == 0){
            res.status(200).json({
                message: 'Student database is empty'
            })
        } else{
            res.status(200).json({
                message: 'List of all students in this databse',
                data: student
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}