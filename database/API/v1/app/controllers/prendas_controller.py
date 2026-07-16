"""Controlador (rutas) para el modelo de Prendas."""

from flask import Blueprint, request, jsonify
from app.models.prenda_model import PrendaModel

prendas_bp = Blueprint("prendas_bp", __name__, url_prefix="/tienda-ropa/api/v1/prendas")
prenda_model = PrendaModel()


@prendas_bp.route("/", methods=["GET"])
def obtener_todas():
    """Obtiene todas las prendas."""
    return jsonify(prenda_model.obtener_todos()), 200


@prendas_bp.route("/<id>", methods=["GET"])
def obtener_por_id(id):
    """Obtiene una prenda por su ID."""
    prenda = prenda_model.obtener_por_id(id)
    if prenda:
        return jsonify(prenda), 200
    return jsonify({"error": "Prenda no encontrada"}), 404


@prendas_bp.route("/", methods=["POST"])
def crear():
    """Crea una nueva prenda."""
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "Debe enviar un JSON con los datos de la prenda"}), 400
    nuevo_id = prenda_model.crear(datos)
    return jsonify({"mensaje": "Prenda creada correctamente", "id": nuevo_id}), 201


@prendas_bp.route("/<id>", methods=["PUT"])
def actualizar(id):
    """Actualiza una prenda existente."""
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "Debe enviar un JSON con los datos a actualizar"}), 400
    actualizado = prenda_model.actualizar(id, datos)
    if actualizado:
        return jsonify({"mensaje": "Prenda actualizada correctamente"}), 200
    return jsonify({"error": "Prenda no encontrada"}), 404


@prendas_bp.route("/<id>", methods=["DELETE"])
def eliminar(id):
    """Elimina una prenda."""
    eliminado = prenda_model.eliminar(id)
    if eliminado:
        return jsonify({"mensaje": "Prenda eliminada correctamente"}), 200
    return jsonify({"error": "Prenda no encontrada"}), 404
