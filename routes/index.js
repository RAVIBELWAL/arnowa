var express = require('express');
var router = express.Router();
const arnowaModel=require('../module/user')

router.get('/', function(req, res, next) {
  res.render('index',{title:'login',alerts:''})
});

router.post('/',(req,res,next)=>{
  var userEmail=req.body.email; 
  var pass=req.body.password;

  var findUser = arnowaModel.findOne({ $or: [{ email: userEmail }, { password:pass }] })
  findUser.exec(function (err, data) {
    if (err) { throw err }
    try {
      console.log(data)
      if(data._id==null){res.render('index', {  alerts: 'Invalid User And Password..' });}
      var getUserID = data._id;
      var getPassword = data.password;
      req.session.activeUser=getUserID;
      req.session.username=data.name;
      if (pass===getPassword) {
        res.render('dashboard',{username:data.name,data:data.records})
      }

      else { res.render('index', {  alerts: 'Invalid User And Password' }); }
  //  throw error;
      
    }
    catch (error) {console.log(error);
      res.render('index', {alerts: 'Please Enter A Valid UserId/Email' }); }//handles any random input or invalid input
  })
})

module.exports = router;
