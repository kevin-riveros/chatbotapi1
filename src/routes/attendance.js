const express = require("express");
const Attendance = require("../models").Attendance;
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
    return res.json({
        ok: false,
        message: `Create new attendance is not available`,
    })
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
