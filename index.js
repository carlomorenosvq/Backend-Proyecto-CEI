const express = require('express');
const db = require('./routes/db_config');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = process.env.PORT|| 1096 ;



app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));


// Agrega el middleware express.static para servir archivos estáticos



app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.json());
db.connect((err =>{
    if(err) throw err;
    console.log('Se ha conectado la base de datos')
}));

app.listen(app.get('port'), () =>{
    console.log('Escuchando en el puerto ' + PORT);
})
app.use('/', require('./routes/pages'));
app.use('/api', require('./controllers/auth'));

app.listen(PORT);