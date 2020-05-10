const express = require("express");
const StudentCourse = require("../models").StudentCourse;
const Student = require("../models").Student;
const Course = require("../models").Course;
const Sequelize = require("../models").Sequelize;
const Grade = require("../models").Grade;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/studentcourse",  async ( req, res ) => {
    const studentcourses = await StudentCourse.findAll()
    return res.json({
        ok: true,
        studentcourses,
        total_studentcourses: studentcourses.length
    })
});

router.post( "/studentcourse",  async ( req, res ) => {
    const { id_course, id_student } = req.body;
    if ( !id_course || !id_student ){
        return res.json({
            ok: false,
            message: `id_course & id_student  are required!`,
        })
    }
    try {
        const find_student = await Student.findOne({
            where:{
                id: id_student
            }
        })
        if ( !find_student ){
            return res.json({
                ok: false,
                message: `Studend don't found - invalid id_student.`,
            })
        }
        const find_course = await Course.findOne({
            where:{
                id: id_course
            }
        })
        if ( !find_course ){
            return res.json({
                ok: false,
                message: `Course don't found - invalid id_course.`,
            })
        }
        const new_studentcourse = await StudentCourse.findOrCreate({
            where:{
                idCourse: id_course,
                idStudent:id_student
            },
            defaults:{ 
                idCourse: id_course,
                idStudent:id_student
            }
        })
        if ( new_studentcourse[1] ){
            return res.json({
                ok: true,
                message: "studentcourse was created succesfully!",
                new_studentcourse: new_studentcourse[0]
            })
        }else {
            return res.json({
                ok: false,
                message: "studentcourse with idCourse & idStudent exists!",
                studentcourse: new_studentcourse[0]
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            message: `Error in server`,
            error
        })
    }    
});

router.post( "/studentcoursegrades",  async ( req, res ) => {
    const { id_course, id_student, mark } = req.body;
    if ( !id_course || !id_student || !mark ){
        return res.json({
            ok: false,
            message: `id_course, grade & id_student  are required!`,
        })
    }
    try {
        const find_studentCourse = await StudentCourse.findOne({
            where:{
                idCourse: id_course,
                idStudent: id_student
            }
        })
        if ( !find_studentCourse ){
            return res.json({
                ok: false,
                message: `Studend course don't found.`,
            })
        }
        const new_grade = await Grade.create({
            mark,
            idStudentCourse: find_studentCourse.id
        })
        return res.json({
            ok: true,
            message: "grade was created succesfully!",
            new_grade
        })

    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            message: `Error in server`,
            error
        })
    }    
});

router.delete( "/studentcourse/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Delete studentcourse with id ${ id } is not available`,
    })
});
router.put( "/studentcourse/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Edit studentcourse with id ${ id } is not available`,
    })
});
module.exports = router;
