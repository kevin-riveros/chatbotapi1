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
    const courses = await Course.findAll()
    return res.json({
        ok: true,
        courses,
        total_courses: courses.length
    })
});

router.post( "/course",  async ( req, res ) => {
    return res.json({
        ok: false,
        message: `Create new course is not available`,
    })
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
