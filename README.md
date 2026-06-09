# Base de Datos NoSQL - Tienda de Ropa

Este proyecto consiste en el diseño e implementación de una base de datos NoSQL utilizando MongoDB para gestionar el flujo comercial de una tienda de ropa, incluyendo el control de usuarios, marcas, prendas e historial de ventas.

---

## Integrantes del Proyecto
* **Alejandro Barquero Bonilla**
* **Howard Saez Sarria**
* **Heber Marin Granados**

---

## Ejemplos JSON de cada Colección


### 1. Colección: usuarios
```json
{
  "_id": {"$oid": "6a24aee21203ab8c34096b1a"},
  "nombre": "María Alfaro",
  "correo": "maria.alfaro@gmail.com",
  "rol": "cliente",
  "fecha_registro": {"$date": "2026-05-15T10:30:00Z"}
}


### 2. Coleccion: Marcas
{
  "_id": {"$oid": "6a24aee21203ab8c34096b2a"},
  "nombre": "Levi's",
  "pais_origen": "USA"
}

### 3. Coleccion: Prendas
{
  "_id": {"$oid": "6a24aee21203ab8c34096b2b"},
  "nombre": "Jeans 501 Classic",
  "marca_id": {"$oid": "6a24aee21203ab8c34096b2a"},
  "precio": 80,
  "stock": 15,
  "talla": "32",
  "categoria": "Mezclilla"
}

### 4. Coleccion: Ventas
{
  "_id": {"$oid": "6a24aee21203ab8c34096b3a"},
  "factura_num": "FAC-001",
  "usuario_id": {"$oid": "6a24aee21203ab8c34096b1a"},
  "fecha": {"$date": "2026-06-02T14:20:00Z"},
  "prendas": [
    {
      "prenda_id": {"$oid": "6a24aee21203ab8c34096b2b"},
      "nombre_prenda": "Jeans 501 Classic",
      "nombre_marca": "Levi's",
      "cantidad": 1,
      "precio_unitario": 80
    }
  ],
  "total": 80
}

