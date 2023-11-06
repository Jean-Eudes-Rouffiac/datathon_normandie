import os

import pandas as pd
import json


import folium
from flask import render_template, request, redirect, url_for, jsonify, abort
from prioreno.conf.conf_file import config
from prioreno.controllers.cache_settings import cache
from prioreno.data_processing.get_data import get_data, get_data_preca_table_data, get_libelle_departement, get_taux_preca_par_departement, get_taux_dpe_par_departement, get_potentiel_energetique, get_taux_potentiel_par_departement, generate_filter_table

pd.set_option('display.max_column', None)

gdf_data = get_data()
gdf_data = get_potentiel_energetique(gdf_data)
gdf_data = get_libelle_departement(gdf_data)

@cache.cached(timeout=50)
def index():
    data = gdf_data
    data_preca = get_taux_preca_par_departement(data)
    data_dpe = get_taux_dpe_par_departement(data)
    data_potentiel = get_taux_potentiel_par_departement(data)
    
    return render_template(
        'index.html',
        data = data,
        data_preca = data_preca,
        data_dpe = data_dpe,
        data_potentiel = data_potentiel,
        data_commune_preca = get_data_preca_table_data(data)
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


def get_filtered_data():
    if request.method == 'POST':

        filters = {
            'dpe': request.form.getlist('dpe[]', None),
            'ges': request.form.getlist('ges[]', None),
            'score_preca': request.form.getlist('score_preca[]', None),
            'confiance': request.form.getlist('confiance[]', None),
            'potentiel': request.form.get('potentiel', None),
            'code_commune_insee': request.form.get('code_commune_insee', None),
        }

        filtered_data = generate_filter_table(gdf_data, filters)

        return jsonify(filtered_data.to_dict(orient='records'))

    return render_template('tables.html')

@cache.cached(timeout=50)
def table():
    return render_template(
        'tables.html',
    )


def login():
    return render_template(
        'login.html',
    )

def forgot_password():
    return render_template(
        'forgot_password.html',
    )

