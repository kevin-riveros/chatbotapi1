const express = require("express");
const Homework = require("../models").Homework;
const Course = require("../models").Course;
const Sequelize = require("../models").Sequelize;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/homework",  async ( req, res ) => {
    const homeworks = await Homework.findAll()
    return res.json({
        ok: true,
        homeworks,
        total_homeworks: homeworks.length
    })
});

router.post( "/homework",  async ( req, res ) => {

    const { start_date, end_date, task, image, alert, title, id_course } = req.body;

    if ( !start_date || !end_date || !task || !image || !alert || !title || !id_course ) {
        return res.json({
            ok: false,
            message: `start_date, end_date, task, image, alert, title, id_course are required!`,
        })
    }
    try {
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
        const new_homework = await Homework.create({
             start_date, end_date, task, image, alert, title, idCourse: id_course 
        })
        return res.json({
            ok: true,
            message: "Homework was created succesfully!",
            new_homework
        })
    } catch (error) {
        console.log("Error", error)
        return res.json({
            ok: false,
            message: `Error in server`,
        })
    } 
});
router.delete( "/homework/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Delete homework with id ${ id } is not available`,
    })
});
router.put( "/homework/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Edit homework with id ${ id } is not available`,
    })
});
module.exports = router;
