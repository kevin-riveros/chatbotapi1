const express = require("express");
const Homework = require("../models").Homework;
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
    return res.json({
        ok: false,
        message: `Create new homework is not available`,
    })
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
