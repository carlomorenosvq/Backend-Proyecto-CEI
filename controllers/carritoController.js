// En carritoController.js

const db = require('../routes/db_config');

// Controlador para agregar un pack al carrito
exports.agregarPackAlCarrito = (req, res) => {
  const packId = req.params.id;
  // Utilizar el método de acceso a la base de datos (por ejemplo, INSERT) para agregar el pack al carrito
  db.query('INSERT INTO carrito (pack_id) VALUES (?)', [packId], (err, result) => {
    if (err) throw err;
    // Redirigir al usuario a la página del carrito
    res.redirect('/carrito');
  });
};