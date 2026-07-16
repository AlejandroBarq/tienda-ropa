"""Controlador (rutas) para el modelo de Usuarios."""

from flask import Blueprint, request, jsonify
from app.models.usuario_model import UsuarioModel

usuarios_bp = Blueprint("usuarios_bp", __name__, url_prefix="/tienda-ropa/api/v1/usuarios")
usuario_model = UsuarioModel()


@usuarios_bp.route("/", methods=["GET"])
def obtener_todos():
    """Obtiene todos los usuarios."""
    return jsonify(usuario_model.obtener_todos()), 200


@usuarios_bp.route("/<id>", methods=["GET"])
def obtener_por_id(id):
    """Obtiene un usuario por su ID."""
    usuario = usuario_model.obtener_por_id(id)
    if usuario:
        return jsonify(usuario), 200
    return jsonify({"error": "Usuario no encontrado"}), 404


@usuarios_bp.route("/", methods=["POST"])
def crear():
    """Crea un nuevo usuario."""
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "Debe enviar un JSON con los datos del usuario"}), 400
    nuevo_id = usuario_model.crear(datos)
    return jsonify({"mensaje": "Usuario creado correctamente", "id": nuevo_id}), 201


@usuarios_bp.route("/<id>", methods=["PUT"])
def actualizar(id):
    """Actualiza un usuario existente."""
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "Debe enviar un JSON con los datos a actualizar"}), 400
    actualizado = usuario_model.actualizar(id, datos)
    if actualizado:
        return jsonify({"mensaje": "Usuario actualizado correctamente"}), 200
    return jsonify({"error": "Usuario no encontrado"}), 404


@usuarios_bp.route("/<id>", methods=["DELETE"])
def eliminar(id):
    """Elimina un usuario."""
    eliminado = usuario_model.eliminar(id)
    if eliminado:
        return jsonify({"mensaje": "Usuario eliminado correctamente"}), 200
    return jsonify({"error": "Usuario no encontrado"}), 404
