import os

import pandas as pd


import folium
from flask import render_template, request, redirect, url_for, jsonify

from prioreno.controllers.cache_settings import cache

pd.set_option('display.max_column', None)

@cache.cached(timeout=50)
def index():
    return render_template(
        'index.html',
    )

def login():
    return render_template(
        'login.html',
    )

def forgot_password():
    return render_template(
        'forgot_password.html',
    )

