const jwt = require('jsonwebtoken');
const db = require('../routes/db_config');
const bcrypt = require('bcryptjs');

const login = async(req,res) =>{
    const { email, password } = req.body;
    if(!email || !password)
        return res.json({status:'error', error:'Por favor intruduce tu email y contraseña'});
    else{
        db.query('SELECT * FROM users WHERE email = ?', [email], async(Err, result) =>{
            console.log(email);
            console.log(result);
            if(Err) throw Err;
            if(!result.length || !await bcrypt.compare(password, result[0].password)){
            return res.json({status: 'error', error:'Email o contraseña incorrecta'});
            }else if(email !== null){
                const token = jwt.sign({ id: result[0].id}, process.env.JWT_SECRET, {
                    expiresIn:process.env.JWT_EXPIRES,
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000),
                    httpOnly:true
                }
                res.cookie('userRegistered', token, cookieOptions);
                res.cookie('email',cookieOptions, email );
                console.log('El usuario ha entrado ' + email);

                // return res.json({status: 'success', success: 'El usuario ha entrado'});
               
            }

        })
    }
}


module.exports= login;


//VARIABLE DE SESIÓN