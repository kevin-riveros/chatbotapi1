const express = require("express");
const Grade = require("../models").Grade;
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
    return res.json({
        ok: false,
        message: `Create new grade is not available`,
    })
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
