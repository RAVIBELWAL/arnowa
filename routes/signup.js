const express= require('express');
const router=express();
const arnowaModel=require('../module/user')

function checkEamil(req, res, next) {
 // console.log(req.body)
  var userEmail = req.body.email;
  userEmail=userEmail.toLowerCase();

  var checkemail = arnowaModel.findOne({ email: userEmail })
  checkemail.exec((err, data) => {
    if (err) throw err
    if (data) {   //if yes means email already exit in db1
      return res.render('signup', {alerts: '***This Email Already In Use', data: req.body})
    }
    next();
  })
}

function confirmPassword(req, res, next) {
 // console.log(req.body)
  var pass = req.body.password;
  var confPass = req.body.passwords;
  if (pass !== confPass) {
    return res.render('signup', {alerts: '***Password Are Not Same', data: req.body})
  }
  else if ((pass.length)<6) {
    return res.render('signup', {alerts: '***Password Must Be Of 6 Character', data: req.body})
  }  
  next();
}

var generateNum=()=> {
          
  var digits = '0123456789';
  let num = '';
  let randoms=[]
  for(let j=0; j<3;j++)
  { 
  for (let i = 0; i < 3; i++ ) {
      num += digits[Math.floor(Math.random() * 10)];
  }
  randoms[j]=num;
  num=''
//  console.log(randoms[j])
}
  return randoms;
}

router.get('/',(req,res,next)=>{
 res.render('signup',{alerts:'',data:''})
})

router.post('/',checkEamil,confirmPassword,(req, res, next)=> {
  var username=req.body.name;
  var userEmail=req.body.email; 
  var pass=req.body.password;
  var pass2=req.body.passwords;
  console.log(req.body)
  let num=generateNum()
 // console.log(num.length)


  var insertUser=new arnowaModel({
    name:username,
    email:userEmail,
    password:pass,
    records:num,

  })
  insertUser.save((err,data)=>{
    if(err)throw err
    res.render('index',{title:'login',alerts:''});
  })
})

module.exports=router

