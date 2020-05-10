const express = require("express");
const Attendance = require("../models").Attendance;
const Student = require("../models").Student;
const Sequelize = require("../models").Sequelize;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/attendance",  async ( req, res ) => {
    const attendances = await Attendance.findAll()
    return res.json({
        ok: true,
        attendances,
        total_attendances: attendances.length
    })
});

router.post( "/attendance",  async ( req, res ) => {
    
    const { attendance_date, attended, id_student } = req.body;
    if ( !attendance_date || !attended || !id_student ){
        return res.json({
            ok: false,
            message: `attendance_date, attended & id_student are required!`,
        })
    }
    try {
        const idStudent = id_student

        const find_student = await Student.findOne({
            where:{
                id: idStudent
            }
        })
        if ( !find_student ) {
            return res.json({
                ok: false,
                message: `Studend don't found - invalid id_student.`,
            })
        }
        const new_attendance = await Attendance.create({ 
                attendance_date, attended, idStudent
            })
        return res.json({
            ok: true,
            message: "attendance was created succesfully!",
            new_attendance
        })

    } catch (error) {
        return res.json({
            ok: false,
            message: `Error in server.`,
            error
        })
    }
});
router.delete( "/attendance/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Delete attendance with id ${ id } is not available`,
    })
});
router.put( "/attendance/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Edit attendance with id ${ id } is not available`,
    })
});
module.exports = router;
