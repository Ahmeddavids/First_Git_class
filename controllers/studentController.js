const studentModel = require('../models/studentModel');

exports.createStudent = async (req, res) => {
    try {
        const student = await studentModel.create(req.body);
        if (!student) {
            res.status(400).json({
                status: "Failed",
                message: 'Error creating student'
            })
        } else {
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
        if (student.length == 0) {
            res.status(200).json({
                status: "Failed",
                message: 'Student database is empty'
            })
        } else {
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

exports.getOne = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentModel.findById(studentId);
        if(!student){
            res.status(404).json({
                status: "Failed",
                message: `Student with ${studentId} not found`
            })
        } else {
            res.status(200).json({
                status: 'Success',
                data: student
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateOne = async (req, res) => {
    try {
        // Get the student's ID from the params
        const studentId = req.params.id;

        // Find the student in the database
        const student = await studentModel.findById(studentId);

        // Check if the student exists in the database
        if (!student) {
            return res.status(404).json({
                status: "Failed",
                message: `STudent with ID: ${studentId} not found`
            })
        }

        // construct the update data
        const data = {
            name: req.body.name || student.name,
            stack: req.body.stack || student.stack,
            score: {
                html: req.body.score.html || student.score.html,
                javaScript: req.body.score.javaScript || student.score.javaScript,
                css: req.body.score.css || student.score.css,
                node: req.body.score.node || student.score.node,
            }
        }

        // Update the database
        const updatedStudent = await studentModel.findByIdAndUpdate(studentId, data, {new: true})

        // return the updated data to the client
        res.status(200).json({
            message: "Student updated successfully",
            data: updatedStudent
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentModel.findById(studentId);
        if(!student){
            res.status(404).json({
                status: "Failed",
                message: `Student with ${studentId} not found`
            })
        } else {
            await studentModel.findByIdAndDelete(studentId);
            res.status(200).json({
                status: 'Success',
                message: 'Student deleted successfully'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.makeAdmin = async (req, res) => {
    try {
         // Get the student's ID from the params
         const studentId = req.params.id;

         // Find the student in the database
         const student = await studentModel.findById(studentId);
 
         // Check if the student exists in the database
         if (!student) {
             return res.status(404).json({
                 status: "Failed",
                 message: `STudent with ID: ${studentId} not found`
             })
         }

         const admin = await studentModel.findByIdAndUpdate(studentId, {isAdmin: true}, {new: true});

         res.status(200).json({
            message: "Admin updated successfully",
            data: admin
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


