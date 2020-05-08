const express = require('express');
const router = express.Router();


router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.use(require('./student'));
router.use(require('./teacher'));
router.use(require('./course'));
router.use(require('./attendance'));
router.use(require('./grade'));
router.use(require('./homework'));
router.use(require('./meeting'));

/*
router.get('/',(req,res)=>{
    res.send("API BOT IS WORKING 🍪.")
});
*/

module.exports = router;