import os

import requests
import pandas as pd
import geopandas as gpd

from prioreno.conf.conf_file import config
from prioreno.controllers.cache_settings import cache

pd.set_option('display.max_column', None)


def get_data():

    url = config["data"]["url"] + '1' + '.csv'
    df = pd.read_csv(url)

    for i in range(2, 11):
        url = config["data"]["url"] + str(i) + '.csv'
        df_i = pd.read_csv(url, low_memory=False)
        df = pd.concat([df, df_i])

    df = gpd.GeoDataFrame(df, geometry=gpd.GeoSeries.from_wkt(df[config["data"]["geometry_colum"]]))
    df.crs = "EPSG:2154"

    return df


def get_data_preca_table_data(df: pd.DataFrame) -> pd.DataFrame:
    commune_nb_log = df[['libelle_commune_insee', 'nb_log']].groupby('libelle_commune_insee').sum('nb_log')
    commune_nb_preca = df[df['precarite_energetique']==5][['libelle_commune_insee', 'precarite_energetique']].groupby(['libelle_commune_insee']).agg({'precarite_energetique': 'count'}).reset_index()
    commune_nb_potentiel = df[['libelle_commune_insee', 'batiment_id_associe']].groupby('libelle_commune_insee').count().reset_index().rename(columns={'batiment_id_associe':'potentiel_energetique'})

    data_preca = commune_nb_log.merge(commune_nb_preca, on = 'libelle_commune_insee', how = 'left').sort_values(by='precarite_energetique', ascending=False).head(20)
    data_preca = data_preca.merge(commune_nb_potentiel, on = 'libelle_commune_insee', how = 'left')

    data_preca['nb_log'] = data_preca['nb_log'].astype(int)
    data_preca['precarite_energetique'] = data_preca['precarite_energetique'].astype(int)
    data_preca['potentiel_energetique'] = data_preca['potentiel_energetique'].astype(int)

    return data_preca

    