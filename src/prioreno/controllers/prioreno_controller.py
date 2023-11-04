import os

import pandas as pd


import folium
from flask import render_template, request, redirect, url_for, jsonify
from prioreno.conf.conf_file import config
from prioreno.controllers.cache_settings import cache
from prioreno.data_processing.get_data import get_data

pd.set_option('display.max_column', None)

gdf_data = get_data()

@cache.cached(timeout=50)
def index():
    sum_logement = gdf_data['nb_log'].sum()
    return render_template(
        'index.html',
        data = gdf_data
    )

def login():
    return render_template(
        'login.html',
    )

def forgot_password():
    return render_template(
        'forgot_password.html',
    )

