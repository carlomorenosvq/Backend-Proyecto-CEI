const db = require('../routes/db_config');
const bcrypt = require('bcryptjs');

const music = async (req, res) => {
  const { spotify, hours, pack } = req.body;

  if (!spotify || !hours || !pack) {
    return res.json({ status: 'error', error: 'Por favor introduce tu nombre, horas de Spotify y el pack elegido' });
  } else {
    connection.query('SELECT * FROM users WHERE spotify = ?', [spotify], async (err, result) => {
      if (err) throw err;
      if (result[0]) {
        return res.json({ status: 'error', error: 'Ya lo ha enviado antes' });
      } else {
        
        connection.query('INSERT INTO users SET ?', { spotify: spotify, hours: hours, pack: pack }, (error, results) => {
          if (error) throw error;
          return res.json({ status: 'success', success: 'Se ha registrado sus datos de celebración!' });
        });
      }
    });
  }
};

module.exports = music; 