MONGOSH

use tienda_ropa
switched to db tienda_ropa
//Filtramos las ventas en el dia 2026-06-02 y mostramos las ventas de ese dia
db.ventas.aggregate([
  { 
    $match: { 
      fecha: { 
        $gte: ISODate("2026-06-02T00:00:00Z"), 
        $lt: ISODate("2026-06-03T00:00:00Z") 
      } 
    } 
  },
  { $unwind: "$prendas" },
  { 
    $group: { 
      _id: null, 
      totalPrendasVendidas: { $sum: "$prendas.cantidad" } 
    } 
  }
]);
{
  _id: null,
  totalPrendasVendidas: 3
}




//Aqui obtenemos todas las marcas que tienen almenos una venta agrupandolas por marca para poder extraer unicamente las que vendieron prendas.
db.ventas.aggregate([
  { $unwind: "$prendas" },
  { 
    $group: { 
      _id: "$prendas.nombre_marca" 
    } 
  }
]);
{
  _id: "Levi's"
}
{
  _id: 'Zara'
}
{
  _id: 'Adidas'
}
{
  _id: 'Nike'
}




//Obtenemos las prendas vendidas y lo que resta en su stock correspondiente y con el lookup junto a la coleccion de prendas mostramos la cantidad vendida y su stock
db.ventas.aggregate([
  { $unwind: "$prendas" },
  {
    $lookup: {
      from: "prendas",
      localField: "prendas.prenda_id",
      foreignField: "_id",
      as: "inventario_actual"
    }
  },
  { $unwind: "$inventario_actual" },
  {
    $project: {
      _id: 0,
      prenda: "$prendas.nombre_prenda",
      cantidad_vendida: "$prendas.cantidad",
      stock_restante: "$inventario_actual.stock"
    }
  }
]);
{
  prenda: 'Camiseta Running',
  cantidad_vendida: 2,
  stock_restante: 47
}
{
  prenda: 'Pantalon Sudadera',
  cantidad_vendida: 1,
  stock_restante: 30
}
{
  prenda: 'Camisa Casual Slim',
  cantidad_vendida: 2,
  stock_restante: 20
}
{
  prenda: 'Jeans 501 Classic',
  cantidad_vendida: 1,
  stock_restante: 15
}
{
  prenda: 'Camiseta Running',
  cantidad_vendida: 1,
  stock_restante: 47
}




//Agrupa las unidades vendidas por marca y ordena de mayor a menor para sacar las 5 mas vendidas, cruza los datos con la colección de prendas usando $lookup y suma el stock actual disponible de cada marca.
db.ventas.aggregate([
  { $unwind: "$prendas" },
  { 
    $group: { 
      _id: "$prendas.nombre_marca", 
      cantidad_de_ventas: { $sum: "$prendas.cantidad" } 
    } 
  },
  { $sort: { cantidad_de_ventas: -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "prendas",
      let: { marca_nombre: "$_id" },
      pipeline: [
        {
          $lookup: {
            from: "marcas",
            localField: "marca_id",
            foreignField: "_id",
            as: "info_marca"
          }
        },
        { $unwind: "$info_marca" },
        { $match: { $expr: { $eq: ["$info_marca.nombre", "$$marca_nombre"] } } }
      ],
      as: "prendas_marca"
    }
  },
  {
    $project: {
      _id: 0,
      marca: "$_id",
      cantidad_de_ventas: 1,
      stock_total_disponible: { $sum: "$prendas_marca.stock" }
    }
  }
]);
{
  cantidad_de_ventas: 3,
  marca: 'Nike',
  stock_total_disponible: 57
}
{
  cantidad_de_ventas: 2,
  marca: 'Zara',
  stock_total_disponible: 20
}
{
  cantidad_de_ventas: 1,
  marca: 'Adidas',
  stock_total_disponible: 30
}
{
  cantidad_de_ventas: 1,
  marca: "Levi's",
  stock_total_disponible: 15
}
Atlas atlas-11na30-shard-0 [primary] tienda_ropa
Selection deleted
