import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_mail import Mail, Message
from flask_jwt_extended import create_access_token, get_jwt_identity, decode_token
import base64  
from werkzeug.security import generate_password_hash
from werkzeug.exceptions import Unauthorized
from flask_cors import CORS

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

# Configurar CORS para permitir solicitudes desde tu frontend
#CORS(app, resources={r"/api/*": {"origins": "https://3000-4geeksacade-juancruzjwt-ddxc0mjy08o.ws-eu118.gitpod.io"}})  # Reemplaza con tu dominio si es necesario
CORS(app)
# Configuración de Flask-Mail
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='shaerkbladex@gmail.com',
    MAIL_PASSWORD='rsgf dwgh clck icvc'
)

mail = Mail(app)

# Configuración de JWT
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)

# Configuración de base de datos
app.url_map.strict_slashes = False
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Configurar administrador y comandos
setup_admin(app)
setup_commands(app)

# Añadir los endpoints de la API con el prefijo "api"
app.register_blueprint(api, url_prefix='/api')

# Configuración del secreto
app.config["SECRET_KEY"] = "clave secreta"

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # evitar caché
    return response

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)