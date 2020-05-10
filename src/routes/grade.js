const express = require("express");
const Grade = require("../models").Grade;
const StudentCourse = require("../models").StudentCourse;


const Sequelize = require("../models").Sequelize;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/grade",  async ( req, res ) => {
    const grades = await Grade.findAll()
    return res.json({
        ok: true,
        grades,
        total_grades: grades.length
    })
});

router.post( "/grade",  async ( req, res ) => {

    const { mark, id_student_course } = req.body;

    try {
        if ( !mark || !id_student_course ) {
            return res.json({
                ok: false,
                message: `mark & id_student_course are required!`,
            })
        }
        const find_student_course = await StudentCourse.findOne({
            where:{
                id: id_student_course
            }
        })
        if ( !find_student_course ) {
            return res.json({
                ok: false,
                message: `Student course don't found, invalid id_student_course!`,
            })
        }
        const new_grade = await Grade.findOrCreate({
            where:{
                idStudentCourse:id_student_course
            },
            defaults:{ 
                mark,
                idStudentCourse:id_student_course
            }
        })
        if ( new_grade[1] ){
            return res.json({
                ok: true,
                message: "grade was created succesfully!",
                new_grade: new_grade[0]
            })
        }
        return res.json({
            ok: false,
            message: "StudentCourse with grade exists!",
            grade: new_grade[0]
        })
        
        
    } catch (error) {
        console.log("ERROR:",error)
        return res.json({
            ok: false,
            message: `Error in server`,
        })
    }
});
router.delete( "/grade/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Delete grade with id ${ id } is not available`,
    })
});
router.put( "/grade/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Edit grade with id ${ id } is not available`,
    })
});
module.exports = router;
