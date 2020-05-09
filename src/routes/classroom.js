const express = require("express");
const Classroom = require("../models").Classroom;
const Sequelize = require("../models").Sequelize;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/classroom",  async ( req, res ) => {
    const classrooms = await Classroom.findAll()
    return res.json({
        ok: true,
        classrooms,
        total_classrooms: classrooms.length
    })
});

router.post( "/classroom",  async ( req, res ) => {

    const { name, id_student_course, id_teacher } = req.body;


    return res.json({
        ok: false,
        message: `Create new classroom is not available`,
    })
});
router.delete( "/classroom/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Delete classroom with id ${ id } is not available`,
    })
});
router.put( "/classroom/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Edit classroom with id ${ id } is not available`,
    })
});
module.exports = router;
