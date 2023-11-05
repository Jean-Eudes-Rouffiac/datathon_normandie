import os

import pandas as pd


import folium
from flask import render_template, request, redirect, url_for, jsonify
from prioreno.conf.conf_file import config
from prioreno.controllers.cache_settings import cache
from prioreno.data_processing.get_data import get_data, get_data_preca_table_data

pd.set_option('display.max_column', None)

gdf_data = get_data()

@cache.cached(timeout=50)
def index():
    return render_template(
        'index.html',
        data = gdf_data
    )

@cache.cached(timeout=50)
def calvados():
    data = gdf_data[gdf_data['code_departement_insee']==14]

    return render_template(
        'calvados.html',
        data = data, 
        data_commune_preca = get_data_preca_table_data(data)
    )

@cache.cached(timeout=50)
def eure():
    data = gdf_data[gdf_data['code_departement_insee']==27]
    return render_template(
        'eure.html',
        data = data,
        data_commune_preca = get_data_preca_table_data(data)
    )

@cache.cached(timeout=50)
def manche():
    data = gdf_data[gdf_data['code_departement_insee']==50]
    return render_template(
        'manche.html',
        data = data,
        data_commune_preca = get_data_preca_table_data(data)
    )

@cache.cached(timeout=50)
def orne():
    data = gdf_data[gdf_data['code_departement_insee']==61]
    return render_template(
        'orne.html',
        data = data,
        data_commune_preca = get_data_preca_table_data(data)
    )

@cache.cached(timeout=50)
def seine_maritime():
    data = gdf_data[gdf_data['code_departement_insee']==76]
    return render_template(
        'seine_maritime.html',
        data = data,
        data_commune_preca = get_data_preca_table_data(data)
    )

def login():
    return render_template(
        'login.html',
    )

def forgot_password():
    return render_template(
        'forgot_password.html',
    )

