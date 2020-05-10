const express = require("express");
const Course = require("../models").Course;
const Sequelize = require("../models").Sequelize;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/course",  async ( req, res ) => {
    try {
        const courses = await Course.findAll()
        return res.json({
            ok: true,
            courses,
            total_courses: courses.length
        })
    } catch (error) {
        console.log("ERROR COURSE:", error)
        return res.json({
            ok: false,
            error: "Server Error",
            error
        })
    }
    
});

router.post( "/course",  async ( req, res ) => {

    const { name } = req.body;
    if ( !name || typeof name != "string" ){
        return res.json({
            ok: false,
            message: `Name type String is required!`,
        })
    }
    try {
        const new_course = await Course.create({ 
            name
            })
        return res.json({
            ok: true,
            message: "Course was created succesfully!",
            new_course
        })
    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            message: `Error in Server`,
            error
        })
    }
});

router.delete( "/course/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Delete course with id ${ id } is not available`,
    })
});
router.put( "/course/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Edit course with id ${ id } is not available`,
    })
});
module.exports = router;
