var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session.destroy(function(err){
        if(err)throw err;
        res.render('index', { data:'', alerts:'Logout Successfully' })
        // console.log('Logout**')
      })

});

module.exports = router;
