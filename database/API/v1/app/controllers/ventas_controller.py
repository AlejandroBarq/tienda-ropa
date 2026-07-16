"""Controlador (rutas) para el modelo de Ventas."""

from flask import Blueprint, request, jsonify
from app.models.venta_model import VentaModel

ventas_bp = Blueprint("ventas_bp", __name__, url_prefix="/tienda-ropa/api/v1/ventas")
venta_model = VentaModel()


@ventas_bp.route("/", methods=["GET"])
def obtener_todas():
    """Obtiene todas las ventas."""
    return jsonify(venta_model.obtener_todos()), 200


@ventas_bp.route("/<id>", methods=["GET"])
def obtener_por_id(id):
    """Obtiene una venta por su ID."""
    venta = venta_model.obtener_por_id(id)
    if venta:
        return jsonify(venta), 200
    return jsonify({"error": "Venta no encontrada"}), 404


@ventas_bp.route("/", methods=["POST"])
def crear():
    """Crea una nueva venta."""
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "Debe enviar un JSON con los datos de la venta"}), 400
    nuevo_id = venta_model.crear(datos)
    return jsonify({"mensaje": "Venta creada correctamente", "id": nuevo_id}), 201


@ventas_bp.route("/<id>", methods=["PUT"])
def actualizar(id):
    """Actualiza una venta existente."""
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "Debe enviar un JSON con los datos a actualizar"}), 400
    actualizado = venta_model.actualizar(id, datos)
    if actualizado:
        return jsonify({"mensaje": "Venta actualizada correctamente"}), 200
    return jsonify({"error": "Venta no encontrada"}), 404


@ventas_bp.route("/<id>", methods=["DELETE"])
def eliminar(id):
    """Elimina una venta."""
    eliminado = venta_model.eliminar(id)
    if eliminado:
        return jsonify({"mensaje": "Venta eliminada correctamente"}), 200
    return jsonify({"error": "Venta no encontrada"}), 404
