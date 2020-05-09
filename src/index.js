require('dotenv').config();
const express = require('express');
const compression = require('compression');
const morgan = require("morgan");
const path = require("path");
const app = express();

//Settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));

//Middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(compression());//comprimir las peticiones en zip
app.use(express.urlencoded({limit: '50mb', extended: true}));


//public
app.use(express.static(app.get("public")));

// Rutas
app.use(require('./routes/index'));

// default 
app.get("*", (req,res) => {
  res.sendFile(__dirname+'/public/index.html');
});

//Empezando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});