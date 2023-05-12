const express = require('express');
const loggedIn = require('../controllers/loggedIn');
const logout = require('../controllers/logout');
const router = express.Router();

router.get('/', loggedIn, (req, res) => {
    if(req.user){
        res.render('index', {status: 'loggedIn', user:req.user});
    }else{
        res.render('index',  {status: 'no', user:'nothing'});
    }
    
});

router.get('/register', (req, res) => {
    res.sendFile('register', {root: './public'});   
});

router.get('/login', (req, res) => {
    res.sendFile('login');
    console.log(req.cookies);
});

//CRUD

const carritoController = require('../controllers/carritoController');
const music = require('../controllers/music');

// // Definir la ruta HTTP para agregar un pack al carrito
// router.post('/carrito', carritoController.agregarPackAlCarrito);

// router.get('/carrito', function(req, res) {
//   // Obtenemos los elementos del carrito desde las variables de sesión
//   let carrito = req.session.carrito;

//   // Renderizamos la vista de carrito y le pasamos los elementos del carrito como parámetros
//   res.render('carrito', { carrito: carrito });
// });






// Registro

router.post('/register', async(req, res) => {
    const email = req.body.user;
    const password = res.body.password;
    const rol = req.body.rol;
    let passworsHaash = await bcrypt.hash(pass,8);
    createConnection.query('INSERT INTO users SET ?', {email: email, password: passworsHaash, rol: rol}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('register',{
                alert: true,
                alertTitle: "Registration",
                alertMessage: "Exitoso!",
                alertIcon: 'sucess',
                showConfirmButton: false,
                time: 1500,
                ruta: ''

            })
        }
    });
});

//11 - Metodo para la autenticacion


router.post('/auth', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    if (email && password) {
      connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results, fields) => {
        if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
          
          res.cookie('email', email);
          res.render('login', {
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Correo electrónico o contraseña incorrectos',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'index'
            
          });
          console.log(req.cookies);
         
        } else {
          //Creamos una variable de sesión y le asignamos true si inició sesión
          
          req.session.loggedin = true;
          req.session.email = results[0].email;
          req.session.rol = results[0].rol;
          res.render('index', {
            alert: true,
            alertTitle: 'Conexión exitosa',
            alertMessage: '¡Inicio de sesión correcto!',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'index'
          });
          console.log(req.cookies);
        }
        res.end();
      });
    } else {
      res.cookie('email', email);
      res.render('index', {

        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Por favor ingrese correo electrónico y contraseña',
        alertIcon: 'error',
        showConfirmButton: true,
        timer: false,
        ruta: 'auth'
        
      });
      console.log(req.cookies);
    }
  });




// router.get('/', function(req, res) {
//   const email = 'email';
//   res.render('index', { email: email });
// });



// router.get('/', (req, res)=> {
// 	if (req.session.login) {
// 		res.cookie('email', email);
//     res.render('index',{

// 			login: true,
// 			email: req.session.email			
// 		});		
// 	} else {
//     res.cookie('email', email);

// 		res.render('index',{
// 			login:false,
// 			email:'Debe iniciar sesión',			
// 		});				
// 	}
// 	res.end();
// });

router.get('/carrito', function(req, res) {
  res.render('carrito');
});

router.get('/', (req, res)=> {
  res.render('carrito', { email: req.session.email})
})

router.post('/logout', (req, res) => {
  res.clearCookie('userRegistered');
  res.clearCookie('email');
  res.render('login');
});

router.get('/logout', logout);






//Envío datos de barra libre

router.get('/music', (req, res) => {
  res.render('carrito');
});

router.get('/music', music);
router.post('/music', async(req, res) => {
  const spotify = req.body.spotify;
  
  const pack = req.body.pack;
  
  connection.query('INSERT INTO users SET ?', {spotify: spotify, hours: hours, pack: pack}, async(error, results)=>{
      if(error){
          console.log(error);
      }else{
          res.render('carrito',{
              alert: true,
              alertTitle: "Registration",
              alertMessage: "Exitoso!",
              alertIcon: 'sucess',
              showConfirmButton: false,
              time: 1500,
              ruta: ''

          })
      }
  });
});

module.exports = router;
