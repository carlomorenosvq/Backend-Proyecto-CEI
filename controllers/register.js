const db = require('../routes/db_config');
const bcrypt = require('bcryptjs'); 

const register = async (req, res) =>{

const{email, password: Npassword} = req.body;

if(!email || !Npassword)
    return res.json({status:'error', error:'Por favor intruduce tu email y contraseña'});
else{
    console.log(email);
    db.query('SELECT email FROM users WHERE email = ?', [email], async(err,result)=>{
        if(err) throw err;
        if(result[0])
            return res.json({status:'error', error:'El email ya existe'});
        else{
            const password = await bcrypt.hash(Npassword,8);
            console.log(password);
            db.query('INSERT INTO users SET ?', {email:email, password:password},(error,results)=>{
                if(error) throw error;
                return res.json({status:'success', success:'Se ha registrado el usuario!'});
            })
        }
    });
}
}


module.exports = register; 