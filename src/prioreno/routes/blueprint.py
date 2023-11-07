from flask import Blueprint

from prioreno.controllers.prioreno_controller import index, login, forgot_password
from prioreno.controllers.prioreno_controller import calvados, eure, manche, orne, seine_maritime
from prioreno.controllers.prioreno_controller import table, get_filtered_data
from prioreno.controllers.prioreno_controller import carte, get_filtered_carte

prioreno_blueprint = Blueprint('prioreno', __name__)

prioreno_blueprint.route('/', methods=['GET'])(index)

prioreno_blueprint.route('/calvados', methods=['GET'])(calvados)
prioreno_blueprint.route('/eure', methods=['GET'])(eure)
prioreno_blueprint.route('/manche', methods=['GET'])(manche)
prioreno_blueprint.route('/orne', methods=['GET'])(orne)
prioreno_blueprint.route('/seine_maritime', methods=['GET'])(seine_maritime)

prioreno_blueprint.route('/get_filtered_data', methods=['POST'])(get_filtered_data)
prioreno_blueprint.route('/table', methods=['GET'])(table)

prioreno_blueprint.route('/get_filtered_carte', methods=['POST'])(get_filtered_carte)
prioreno_blueprint.route('/carte', methods=['GET'])(carte)

prioreno_blueprint.route('/login', methods=['GET'])(login)
prioreno_blueprint.route('/forgot_password', methods=['GET'])(forgot_password)

