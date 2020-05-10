const express = require("express");
const Teacher = require("../models").Teacher;
const Sequelize = require("../models").Sequelize;

const router = express.Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
});

router.get( "/teacher",  async ( req, res ) => {
    const teachers = await Teacher.findAll()
    return res.json({
        ok: true,
        teachers,
        total_teachers: teachers.length
    })
});

router.post( "/teacher",  async ( req, res ) => {
    const Op = Sequelize.Op
    const { name,dni,lastname,email,password } = req.body;
    try {
        if ( !name || !dni || !lastname || !email || !password ) {
            return res.json({
                ok: false,
                error: "name, dni, lastname, email & password are required!"
            })
        }
        if ( typeof name != "string" || typeof dni != "string" ||  typeof lastname != "string"
            || typeof email != "string" ||  typeof password != "string" ){
            return res.json({
                ok: false,
                error: "name, dni, lastname, email & password must be string!"
            })
        }
        const find_teacher = await Teacher.findOne({
            where:{
                [Op.or]: [
                    {
                      dni: dni
                    },
                    {
                      email: email
                    }
                  ]
            }
        })
        if ( find_teacher ) {
            return res.json({
                ok: false,
                error: `Teacher with DNI: ${ dni } or email: ${ email } already exist!`,
            })
        }

        const new_teacher = await Teacher.create({ 
            name,dni,lastname,email,password
          })
        return res.json({
            ok: true,
            message: "Teacher was created succesfully!",
            new_teacher
        })
    } catch (error) {
        console.log("ERROR", error)
        return res.json({
            ok: false,
            error: "Server Error: Error creating new Teacher!",
            error
        })
    }
});
router.delete( "/teacher/:id",  async ( req, res ) => {

    const { id } = req.params;
    const teacher = await Teacher.destroy({
        where:{
            dni: id
        }
    })
    if ( teacher ) {
        return res.json({
            ok: true,
            teacher,
            message: `teacher with DNI ${ id } was deleted succesfully!`
        })
    }
    return res.json({
        ok: false,
        message: `teacher with DNI: ${ id } don't found!`,
    })
});

module.exports = router;
