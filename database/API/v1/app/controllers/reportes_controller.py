"""Controlador con los 3 reportes solicitados en el Proyecto 1."""

from flask import Blueprint, jsonify
from app.models.reporte_model import ReporteModel

reportes_bp = Blueprint(
    "reportes_bp", __name__, url_prefix="/tienda-ropa/api/v1/prendas/reportes"
)
reporte_model = ReporteModel()


@reportes_bp.route("/marcas-con-ventas", methods=["GET"])
def marcas_con_ventas():
    """Reporte 1: marcas que tienen al menos una venta."""
    return jsonify(reporte_model.marcas_con_ventas()), 200


@reportes_bp.route("/prendas-vendidas-stock", methods=["GET"])
def prendas_vendidas_stock():
    """Reporte 2: prendas vendidas junto con la cantidad restante en stock."""
    return jsonify(reporte_model.prendas_vendidas_con_stock()), 200


@reportes_bp.route("/top-marcas-vendidas", methods=["GET"])
def top_marcas_vendidas():
    """Reporte 3: las 5 marcas más vendidas con su cantidad de ventas."""
    return jsonify(reporte_model.top_5_marcas_mas_vendidas()), 200
