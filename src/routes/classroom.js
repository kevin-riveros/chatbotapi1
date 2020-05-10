const express = require("express");
const Classroom = require("../models").Classroom;
const User = require("../models").User;
const Teacher = require("../models").Teacher;
const CourseClassroom = require("../models").CourseClassroom;


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

router.get( "/classroombystudent/:id_classroom",  async ( req, res ) => {

    const { id_classroom } = req.params;

    try {
        const find_classroom = await Classroom.findOne({
            where:{
                id: id_classroom
            }
        })
        if( !find_classroom ){
            return res.json({
                ok: false,
                message: "invalid  id_classroom!"
            })
        }
        const users = await User.findAll({
            where:{
                idClassroom: id_classroom
            }
        })
        return res.json({
            ok: true,
            users,
        })


    } catch (error) {
        return res.json({
            ok: false,
            message: "Error server",
            error
        })
    }
    
});


router.post( "/classroom",  async ( req, res ) => {

    const { name, id_teacher } = req.body;
    if ( !name || !id_teacher ) {
        return res.json({
            ok: false,
            message: `name & id_teacher are required!`,
        })
    }
    try {
        const find_teacher = await Teacher.findOne({
            where: {
                id: id_teacher
            }
        })
        if( !find_teacher ) {
            return res.json({
                ok: false,
                message: `invalid id_teacher!`,
            })
        }

        const new_classroom = await Classroom.create({
            name, idTeacher:id_teacher
        })
        return res.json({
            ok: true,
            new_classroom,
            message: `Success!`,
        })
    } catch (error) {
        return res.json({
            ok: false,
            message: `Error in server`,
            error
        })
    }
 
});
router.post( "/courseclassroom",  async ( req, res ) => {

    const { id_course, id_teacher, id_classroom } = req.body;
    if ( !id_classroom || !id_teacher || !id_course ) {
        return res.json({
            ok: false,
            message: `id_course, id_teacher, id_classroom are required!`,
        })
    }
    try {
        const new_couseclassroom = await CourseClassroom.findOrCreate({
            where:{
                idCourse:id_course, idTeacher:id_teacher, idClassroom:id_classroom
            },
            defaults:{ 
                idCourse:id_course, idTeacher:id_teacher, idClassroom:id_classroom
            }
        })
        if ( new_couseclassroom[1] ){
            return res.json({
                ok: true,
                message: "courseclassroom was created succesfully!",
                new_couseclassroom: new_couseclassroom[0]
            })
        }
        return res.json({
            ok: false,
            message: "courseclassroom exists!",
            couseclassroom: new_couseclassroom[0]
        })

    } catch (error) {
        return res.json({
            ok: false,
            message: `Error in server`,
            error
        })
    }
 
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
