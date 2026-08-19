# API - Tienda de Ropa

API REST desarrollada en **Python (Flask)** con base de datos **MongoDB Atlas**,
usando arquitectura por capas (controlador + modelo) para cada colección/tabla.


## Instalación y ejecución

```bash
cd API/v1
pip install -r requirements.txt
python run.py
```

La API corre en: `http://127.0.0.1:5000`

---

## Endpoints por modelo

### 1. Prendas

Base URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas`

1. **Obtener todas las prendas**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/`

2. **Obtener prenda por ID**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/<id>`

3. **Crear prenda**
   - Método: `POST`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/`
   - Body (JSON):
     ```json
     {
       "nombre": "Camiseta Running",
       "marca": { "nombre": "Nike", "pais_origen": "USA" },
       "precio": 30,
       "stock": 47,
       "talla": "M",
       "categoria": "Deportiva"
     }
     ```

4. **Actualizar prenda**
   - Método: `PUT`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/<id>`
   - Body (JSON): campos a modificar, por ejemplo `{ "stock": 40 }`

5. **Eliminar prenda**
   - Método: `DELETE`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/<id>`

---

### 2. Usuarios

Base URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/usuarios`

1. **Obtener todos los usuarios**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/usuarios/`

2. **Obtener usuario por ID**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/usuarios/<id>`

3. **Crear usuario**
   - Método: `POST`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/usuarios/`
   - Body (JSON):
     ```json
     {
       "nombre": "Howard Rodríguez",
       "correo": "Howard@email.com",
       "rol": "cliente"
     }
     ```

4. **Actualizar usuario**
   - Método: `PUT`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/usuarios/<id>`

5. **Eliminar usuario**
   - Método: `DELETE`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/usuarios/<id>`

---

### 3. Ventas

Base URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/ventas`

1. **Obtener todas las ventas**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/ventas/`

2. **Obtener venta por ID**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/ventas/<id>`

3. **Crear venta**
   - Método: `POST`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/ventas/`
   - Body (JSON):
     ```json
     {
       "usuario": "Ana Elena Brenes",
       "fecha": "2026-06-04",
       "prendas": [
         { "nombre": "Camiseta Running", "precio": 30, "talla": "M", "cantidad": 1 },
         { "nombre": "Gorra Deportiva", "precio": 15, "talla": "Única", "cantidad": 2 }
       ],
       "total": 60
     }
     ```

4. **Actualizar venta**
   - Método: `PUT`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/ventas/<id>`

5. **Eliminar venta**
   - Método: `DELETE`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/ventas/<id>`

---

## Reportes

Base URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/reportes`

1. **Marcas que tienen al menos una venta**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/reportes/marcas-con-ventas`
   - Respuesta: lista de nombres de marca, por ejemplo `["Nike", "Zara", "Adidas"]`

2. **Prendas vendidas junto con la cantidad restante en stock**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/reportes/prendas-vendidas-stock`
   - Respuesta:
     ```json
     [
       { "prenda": "Camiseta Running", "cantidad_vendida": 1, "stock_restante": 47 }
     ]
     ```

3. **Las 5 marcas más vendidas (cantidad de unidades vendidas por marca)**
   - Método: `GET`
   - URL: `http://127.0.0.1:5000/tienda-ropa/api/v1/prendas/reportes/top-marcas-vendidas`
   - Respuesta:
     ```json
     [
       { "marca": "Nike", "cantidad_vendida": 15 }
     ]
     ```


