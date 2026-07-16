"""Modelo para la colección de prendas de la tienda."""

from bson.objectid import ObjectId


class PrendaModel:
    """Clase para interactuar con la colección de prendas en MongoDB."""

    def __init__(self):
        from app import db
        self.collection = db["prendas"]

    def obtener_todos(self):
        """Retorna todas las prendas de la colección."""
        prendas = list(self.collection.find())
        for prenda in prendas:
            prenda["_id"] = str(prenda["_id"])
        return prendas

    def obtener_por_id(self, prenda_id):
        """Busca una prenda por su ObjectId."""
        try:
            prenda = self.collection.find_one({"_id": ObjectId(prenda_id)})
            if prenda:
                prenda["_id"] = str(prenda["_id"])
            return prenda
        except Exception:  # pylint: disable=broad-exception-caught
            return None

    def crear(self, datos):
        """Inserta una nueva prenda y retorna su ID como string."""
        resultado = self.collection.insert_one(datos)
        return str(resultado.inserted_id)

    def actualizar(self, prenda_id, datos):
        """Actualiza una prenda existente. Retorna True si se modificó algo."""
        try:
            resultado = self.collection.update_one(
                {"_id": ObjectId(prenda_id)}, {"$set": datos}
            )
            return resultado.matched_count > 0
        except Exception:  # pylint: disable=broad-exception-caught
            return False

    def eliminar(self, prenda_id):
        """Elimina una prenda por su ID. Retorna True si se eliminó."""
        try:
            resultado = self.collection.delete_one({"_id": ObjectId(prenda_id)})
            return resultado.deleted_count > 0
        except Exception:  # pylint: disable=broad-exception-caught
            return False
