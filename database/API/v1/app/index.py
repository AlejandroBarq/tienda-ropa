"""Registra todos los controladores (Blueprints) de la aplicación."""

from app import app
from app.controllers.prendas_controller import prendas_bp
from app.controllers.usuarios_controller import usuarios_bp
from app.controllers.ventas_controller import ventas_bp
from app.controllers.reportes_controller import reportes_bp

app.register_blueprint(prendas_bp)
app.register_blueprint(usuarios_bp)
app.register_blueprint(ventas_bp)
app.register_blueprint(reportes_bp)
