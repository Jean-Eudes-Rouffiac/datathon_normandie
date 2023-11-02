from flask import Blueprint

from prioreno.controllers.prioreno_controller import index, login, forgot_password

prioreno_blueprint = Blueprint('prioreno', __name__)

prioreno_blueprint.route('/', methods=['GET'])(index)
prioreno_blueprint.route('/login', methods=['GET'])(login)
prioreno_blueprint.route('/forgot_password', methods=['GET'])(forgot_password)
