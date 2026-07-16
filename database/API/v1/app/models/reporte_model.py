"""Modelo encargado de los reportes solicitados en el Proyecto 1.

Nota sobre el diseño: en la colección 'ventas', cada prenda vendida se
guarda embebida por 'nombre' (no por ObjectId). Por eso, para relacionar
una venta con su marca, se busca la prenda correspondiente en la
colección 'prendas' usando ese nombre.
"""

from app import db


class ReporteModel:
    """Genera los reportes/vistas requeridos a partir de prendas y ventas."""

    def __init__(self):
        self.prendas = db["prendas"]
        self.ventas = db["ventas"]

    def marcas_con_ventas(self):
        """Reporte 1: todas las marcas que tienen al menos una venta."""
        ventas = list(self.ventas.find())

        nombres_vendidos = set()
        for venta in ventas:
            for prenda_vendida in venta.get("prendas", []):
                nombres_vendidos.add(prenda_vendida["nombre"])

        marcas = set()
        for nombre in nombres_vendidos:
            prenda_doc = self.prendas.find_one({"nombre": nombre})
            if prenda_doc and "marca" in prenda_doc:
                marcas.add(prenda_doc["marca"]["nombre"])

        return sorted(marcas)

    def prendas_vendidas_con_stock(self):
        """Reporte 2: prendas vendidas junto con la cantidad restante en stock."""
        ventas = list(self.ventas.find())

        cantidad_vendida_por_prenda = {}
        for venta in ventas:
            for prenda_vendida in venta.get("prendas", []):
                nombre = prenda_vendida["nombre"]
                cantidad = prenda_vendida.get("cantidad", 0)
                cantidad_vendida_por_prenda[nombre] = (
                    cantidad_vendida_por_prenda.get(nombre, 0) + cantidad
                )

        resultado = []
        for nombre, cantidad_vendida in cantidad_vendida_por_prenda.items():
            prenda_doc = self.prendas.find_one({"nombre": nombre})
            stock_restante = prenda_doc["stock"] if prenda_doc else None
            resultado.append({
                "prenda": nombre,
                "cantidad_vendida": cantidad_vendida,
                "stock_restante": stock_restante,
            })

        return resultado

    def top_5_marcas_mas_vendidas(self):
        """Reporte 3: las 5 marcas más vendidas con su cantidad de ventas."""
        ventas = list(self.ventas.find())

        cantidad_por_marca = {}
        for venta in ventas:
            for prenda_vendida in venta.get("prendas", []):
                prenda_doc = self.prendas.find_one({"nombre": prenda_vendida["nombre"]})
                if prenda_doc and "marca" in prenda_doc:
                    marca = prenda_doc["marca"]["nombre"]
                    cantidad = prenda_vendida.get("cantidad", 0)
                    cantidad_por_marca[marca] = cantidad_por_marca.get(marca, 0) + cantidad

        ranking = sorted(cantidad_por_marca.items(), key=lambda item: item[1], reverse=True)

        return [
            {"marca": marca, "cantidad_vendida": cantidad}
            for marca, cantidad in ranking[:5]
        ]
