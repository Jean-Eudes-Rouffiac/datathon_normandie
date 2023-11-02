import os

from flask import Flask
from prioreno import STATIC_DIR, TEMPLATE_DIR

from prioreno.controllers.cache_settings import cache


def create_app():
    app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)  # flask app object

    cache.init_app(app)

    @app.after_request
    def after_request(response):
        response.headers["Cache-control"] = "no-cache, no-store, must-revalidate, public, max-age=0"

        return response

    from prioreno.routes.blueprint import prioreno_blueprint

    app.register_blueprint(prioreno_blueprint, url_prefix='/')

    return app