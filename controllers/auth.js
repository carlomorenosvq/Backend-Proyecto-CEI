const express = require('express');
const router = express.Router();
const register = require('./register');
const login = require('./login');


function auth(req, res){
    const data = req.body;
    req.getConnection((err, conn) => {
      conn.query(
        "SELECT * FROM users WHERE email = ?",
        [data.email],
        (err, userdata) => {
          
          if (userdata.length > 0) {
            bcrypt.compare(data.password, userdata.password, (err, isMatch) =>{
  
              userdata.forEach(element =>{
                console.log(element.password);
              })
              // if(!isMatch){
              //   res.render('login/index', {error: 'Error: contraseña incorrecta!'});
              // }else{
              //   console.log("Bienvenido");
              // }
            })
          } else {
            res.cookie('email', email);
            res.render("login/index", {
              error: "Error: Este usuario ya existe! ",
            });
            console.log("Usuario no existe!");
          }
        });
    });
  }


router.post('/register', register);
router.post('/login', login);



module.exports = router;