"""Modelo para la colección de ventas de la tienda."""

from bson.objectid import ObjectId


class VentaModel:
    """Clase para interactuar con la colección de ventas en MongoDB."""

    def __init__(self):
        from app import db
        self.collection = db["ventas"]

    def obtener_todos(self):
        """Retorna todas las ventas de la colección."""
        ventas = list(self.collection.find())
        for venta in ventas:
            venta["_id"] = str(venta["_id"])
        return ventas

    def obtener_por_id(self, venta_id):
        """Busca una venta por su ObjectId."""
        try:
            venta = self.collection.find_one({"_id": ObjectId(venta_id)})
            if venta:
                venta["_id"] = str(venta["_id"])
            return venta
        except Exception:  # pylint: disable=broad-exception-caught
            return None

    def crear(self, datos):
        """Inserta una nueva venta y retorna su ID como string."""
        resultado = self.collection.insert_one(datos)
        return str(resultado.inserted_id)

    def actualizar(self, venta_id, datos):
        """Actualiza una venta existente. Retorna True si se modificó algo."""
        try:
            resultado = self.collection.update_one(
                {"_id": ObjectId(venta_id)}, {"$set": datos}
            )
            return resultado.matched_count > 0
        except Exception:  # pylint: disable=broad-exception-caught
            return False

    def eliminar(self, venta_id):
        """Elimina una venta por su ID. Retorna True si se eliminó."""
        try:
            resultado = self.collection.delete_one({"_id": ObjectId(venta_id)})
            return resultado.deleted_count > 0
        except Exception:  # pylint: disable=broad-exception-caught
            return False
