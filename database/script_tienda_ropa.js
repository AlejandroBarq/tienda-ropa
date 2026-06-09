MONGOSH terminal donde creamos la BD 

 
//creamos la bd Tienda de ropa 
db = db.getSiblingDB('tienda_ropa');
// Limpieza previa de colecciones para permitir re-ejecución limpia del script
db.usuarios.drop();
db.marcas.drop();
db.prendas.drop();
db.ventas.drop();
true
 


 // Insertamos las marcas.
db.marcas.insertMany([
  { nombre: "Nike", pais_origen: "USA" },
  { nombre: "Adidas", pais_origen: "Alemania" },
  { nombre: "Zara", pais_origen: "España" },
  { nombre: "Levi's", pais_origen: "USA" },
  { nombre: "Puma", pais_origen: "Alemania" }
]);



// Guardamos los IDs de cada marca. 
const idNike = db.marcas.findOne({ nombre: "Nike" })._id;
const idAdidas = db.marcas.findOne({ nombre: "Adidas" })._id;
const idZara = db.marcas.findOne({ nombre: "Zara" })._id;
const idLevis = db.marcas.findOne({ nombre: "Levi's" })._id;
const idPuma = db.marcas.findOne({ nombre: "Puma" })._id;
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a24aee21203ab8c34096b28'),
    '1': ObjectId('6a24aee21203ab8c34096b29'),
    '2': ObjectId('6a24aee21203ab8c34096b2a'),
    '3': ObjectId('6a24aee21203ab8c34096b2b'),
    '4': ObjectId('6a24aee21203ab8c34096b2c')
  }
}



//Insertamos los datos 
db.prendas.insertMany([
  { nombre: "Camiseta Running", marca_id: idNike, precio: 30, stock: 50, talla: "M", categoria: "Deportiva" },
  { nombre: "Pantalon Sudadera", marca_id: idAdidas, precio: 45, stock: 30, talla: "L", categoria: "Deportiva" },
  { nombre: "Camisa Casual Slim", marca_id: idZara, precio: 35, stock: 20, talla: "S", categoria: "Casual" },
  { nombre: "Jeans 501 Classic", marca_id: idLevis, precio: 80, stock: 15, talla: "32", categoria: "Mezclilla" },
  { nombre: "Zapatillas Urbanas", marca_id: idPuma, precio: 65, stock: 25, talla: "40", categoria: "Calzado" },
  { nombre: "Gorra Deportiva", marca_id: idNike, precio: 15, stock: 10, talla: "Única", categoria: "Accesorios" }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a24af5a1203ab8c34096b2d'),
    '1': ObjectId('6a24af5a1203ab8c34096b2e'),
    '2': ObjectId('6a24af5a1203ab8c34096b2f'),
    '3': ObjectId('6a24af5a1203ab8c34096b30'),
    '4': ObjectId('6a24af5a1203ab8c34096b31'),
    '5': ObjectId('6a24af5a1203ab8c34096b32')
  }
}


// Guardamos las prendas en variables.
const prendaCamiseta = db.prendas.findOne({ nombre: "Camiseta Running" });
const prendaPantalon = db.prendas.findOne({ nombre: "Pantalon Sudadera" });
const prendaCamisa = db.prendas.findOne({ nombre: "Camisa Casual Slim" });
const prendaJeans = db.prendas.findOne({ nombre: "Jeans 501 Classic" });
// Insertamos el dato individual
db.usuarios.insertOne({ nombre: "Juan Pérez", correo: "juan@email.com", rol: "cliente" });
{
  acknowledged: true,
  insertedId: ObjectId('6a24aff11203ab8c34096b33')
}



// Insertamos el dato en grupo
db.usuarios.insertMany([
  { nombre: "Maria Gómez", correo: "maria@email.com", rol: "cliente" },
  { nombre: "Carlos Rodriguez", correo: "carlos@email.com", rol: "administrador" },
  { nombre: "Ana Elena Brenes", correo: "ana@email.com", rol: "cliente" }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a24b00e1203ab8c34096b34'),
    '1': ObjectId('6a24b00e1203ab8c34096b35'),
    '2': ObjectId('6a24b00e1203ab8c34096b36')
  }
}
const idUserJuan = db.usuarios.findOne({ nombre: "Juan Pérez" })._id;
const idUserMaria = db.usuarios.findOne({ nombre: "Maria Gómez" })._id;
const idUserAna = db.usuarios.findOne({ nombre: "Ana Elena Brenes" })._id;



// Insertamos datos de las ventas
db.ventas.insertMany([
  {
    usuario_id: idUserJuan,
    fecha: ISODate("2026-06-01T10:00:00Z"),
    prendas: [
      { prenda_id: prendaCamiseta._id, nombre_prenda: prendaCamiseta.nombre, marca_id: prendaCamiseta.marca_id, nombre_marca: "Nike", cantidad: 2, precio_unitario: 30 }
    ],
    total: 60
  },
  {
    usuario_id: idUserMaria,
    fecha: ISODate("2026-06-02T15:30:00Z"),
    prendas: [
      { prenda_id: prendaPantalon._id, nombre_prenda: prendaPantalon.nombre, marca_id: prendaPantalon.marca_id, nombre_marca: "Adidas", cantidad: 1, precio_unitario: 45 },
      { prenda_id: prendaCamisa._id, nombre_prenda: prendaCamisa.nombre, marca_id: prendaCamisa.marca_id, nombre_marca: "Zara", cantidad: 2, precio_unitario: 35 }
    ],
    total: 115
  },
  {
    usuario_id: idUserAna,
    fecha: ISODate("2026-06-04T11:20:00Z"),
    prendas: [
      { prenda_id: prendaJeans._id, nombre_prenda: prendaJeans.nombre, marca_id: prendaJeans.marca_id, nombre_marca: "Levi's", cantidad: 1, precio_unitario: 80 },
      { prenda_id: prendaCamiseta._id, nombre_prenda: prendaCamiseta.nombre, marca_id: prendaCamiseta.marca_id, nombre_marca: "Nike", cantidad: 1, precio_unitario: 30 }
    ],
    total: 110
  }
]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a24b14d1203ab8c34096b37'),
    '1': ObjectId('6a24b14d1203ab8c34096b38'),
    '2': ObjectId('6a24b14d1203ab8c34096b39')
  }
}



// Aqui vamos a actualizar el stock de la prenda haciendo una venta o ajuste usando update.
db.prendas.updateOne(
  { nombre: "Camiseta Running" },
  { $set: { stock: 47 } }
);
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}




// Aqui hacemos un ejemplo de delete eliminando a un usuario. 
db.usuarios.deleteOne(
  { correo: "juan@email.com" }
);
{
  acknowledged: true,
  deletedCount: 1
}
Atlas atlas-11na30-shard-0 [primary] tienda_ropa
Selection deleted
