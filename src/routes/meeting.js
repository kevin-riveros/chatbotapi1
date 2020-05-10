const express = require("express");
const Meeting = require("../models").Meeting;
const Sequelize = require("../models").Sequelize;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/meeting",  async ( req, res ) => {
    const meetings = await Meeting.findAll()
    return res.json({
        ok: true,
        meetings,
        total_meetings: meetings.length
    })
});

router.post( "/meeting",  async ( req, res ) => {

    const { meeting_date, start_date, end_date, reason, id_teacher, id_student } = req.body;

    if ( !meeting_date || !start_date || !end_date || !reason || !id_teacher || !id_student ) {
        return res.json({
            ok: false,
            message: `meeting_date, start_date, end_date, reason, id_teacher, id_student required!`,
        })
    }
    try {

        const new_meeting = await Meeting.create({
            meeting_date, start_date, end_date, reason, idTeacher: id_teacher, idStudent: id_student
        })
        return res.json({
            ok: true,
            new_meeting,
            message: "success"
        })


    } catch (error) {
        return res.json({
            ok: false,
            message: `Error server.`,
            error
        })
    } 
});
router.delete( "/meeting/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Delete meeting with id ${ id } is not available`,
    })
});
router.put( "/meeting/:id",  async ( req, res ) => {
    const { id } = req.params;
    return res.json({
        ok: false,
        message: `Edit meeting with id ${ id } is not available`,
    })
});
module.exports = router;
