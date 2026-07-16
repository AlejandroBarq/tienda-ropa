"""Modelo para la colección de usuarios de la tienda."""

from bson.objectid import ObjectId


class UsuarioModel:
    """Clase para interactuar con la colección de usuarios en MongoDB."""

    def __init__(self):
        from app import db
        self.collection = db["usuarios"]

    def obtener_todos(self):
        """Retorna todos los usuarios de la colección."""
        usuarios = list(self.collection.find())
        for usuario in usuarios:
            usuario["_id"] = str(usuario["_id"])
        return usuarios

    def obtener_por_id(self, usuario_id):
        """Busca un usuario por su ObjectId."""
        try:
            usuario = self.collection.find_one({"_id": ObjectId(usuario_id)})
            if usuario:
                usuario["_id"] = str(usuario["_id"])
            return usuario
        except Exception:  # pylint: disable=broad-exception-caught
            return None

    def crear(self, datos):
        """Inserta un nuevo usuario y retorna su ID como string."""
        resultado = self.collection.insert_one(datos)
        return str(resultado.inserted_id)

    def actualizar(self, usuario_id, datos):
        """Actualiza un usuario existente. Retorna True si se modificó algo."""
        try:
            resultado = self.collection.update_one(
                {"_id": ObjectId(usuario_id)}, {"$set": datos}
            )
            return resultado.matched_count > 0
        except Exception:  # pylint: disable=broad-exception-caught
            return False

    def eliminar(self, usuario_id):
        """Elimina un usuario por su ID. Retorna True si se eliminó."""
        try:
            resultado = self.collection.delete_one({"_id": ObjectId(usuario_id)})
            return resultado.deleted_count > 0
        except Exception:  # pylint: disable=broad-exception-caught
            return False
