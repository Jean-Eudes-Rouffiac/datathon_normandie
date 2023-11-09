import os

import numpy as np
import pandas as pd
import geopandas as gpd

from prioreno.conf.conf_file import config
from prioreno.controllers.cache_settings import cache
from prioreno.data_processing import CSV_FILE

pd.set_option('display.max_column', None)
pd.options.mode.chained_assignment = None


""" def get_data() -> gpd.GeoDataFrame:

    url = config["data"]["url"] + '1' + '.csv'
    df = pd.read_csv(url)

    for i in range(2, 11):
        print("téléchargement")
        url = config["data"]["url"] + str(i) + '.csv'
        df_i = pd.read_csv(url, low_memory=False)
        df = pd.concat([df, df_i])

    df = gpd.GeoDataFrame(df, geometry=gpd.GeoSeries.from_wkt(df[config["data"]["geometry_colum"]]))
    df.crs = "EPSG:2154"
    df = df.to_crs('EPSG:4326')

    return df """

def get_data() -> gpd.GeoDataFrame:

    df = pd.read_csv(CSV_FILE)

    df = gpd.GeoDataFrame(df, geometry=gpd.GeoSeries.from_wkt(df[config["data"]["geometry_colum"]]))
    df.crs = "EPSG:2154"
    df = df.to_crs('EPSG:4326')

    return df


def get_data_preca_table_data(df: gpd.GeoDataFrame) -> gpd.GeoDataFrame:

    commune_nb_log = df[['libelle_commune_insee', 'nb_log']].groupby('libelle_commune_insee').sum('nb_log')
    commune_nb_preca = df[df['precarite_energetique']==5][['libelle_commune_insee', 'nb_log']].groupby(['libelle_commune_insee']).agg({'nb_log': 'sum'}).reset_index().rename(columns={'nb_log':'precarite_energetique'})
    commune_nb_potentiel = df[df['potentiel_energetique']==1][['libelle_commune_insee', 'nb_log']].groupby(['libelle_commune_insee']).agg({'nb_log': 'sum'}).reset_index().rename(columns={'nb_log':'potentiel_energetique'})

    data_preca = commune_nb_log.merge(commune_nb_preca, on = 'libelle_commune_insee', how = 'left').sort_values(by='precarite_energetique', ascending=False).head(20)
    data_preca = data_preca.merge(commune_nb_potentiel, on = 'libelle_commune_insee', how = 'left')

    data_preca['nb_log'] = data_preca['nb_log'].astype(int)
    #data_preca['precarite_energetique'] = data_preca['precarite_energetique'].astype(int)
    #data_preca['potentiel_energetique'] = data_preca['potentiel_energetique'].astype(int)

    return data_preca

def get_libelle_departement(df: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    departement_mapping = {
    14: 'Calvados',
    27: 'Eure',
    50: 'Manche',
    61: 'Orne',
    76: 'Seine-Maritime',
    }
    df['libelle_departement'] = df['code_departement_insee'].map(departement_mapping)
    return df

def get_potentiel_energetique(df: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    df['potentiel_energetique'] = df['score similitude'].notnull().astype(int)
    return df

def get_taux_preca_par_departement(df: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    total_logement_departement = df[["libelle_departement", "nb_log"]].groupby(["libelle_departement"]).sum("nb_log").reset_index()
    total_preca_departement = df[["libelle_departement", "precarite_energetique", "nb_log"]].groupby(["libelle_departement", "precarite_energetique"]).sum("nb_log").reset_index().rename(columns = {'nb_log' : 'nb_log_preca'})

    departement_preca = total_preca_departement.merge(total_logement_departement, on='libelle_departement', how = 'left')
    departement_preca['taux_preca'] = np.where(departement_preca['nb_log'] != 0, np.round((departement_preca['nb_log_preca'] / departement_preca['nb_log'])*100, 0), np.nan)
    departement_preca['taux_preca'] = departement_preca['taux_preca'].astype(int)
    departement_preca = departement_preca.drop(columns=['nb_log_preca', 'nb_log'])

    return departement_preca

def get_taux_dpe_par_departement(df: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    total_logement_departement = df[["libelle_departement", "nb_log"]].groupby(["libelle_departement"]).sum("nb_log").reset_index()
    total_dpe_departement = df[["libelle_departement", "dpe", "nb_log"]].groupby(["libelle_departement", "dpe"]).sum("nb_log").reset_index().rename(columns = {'nb_log' : 'nb_log_dpe'})

    departement_dpe = total_dpe_departement.merge(total_logement_departement, on='libelle_departement', how = 'left')
    departement_dpe['taux_dpe'] = np.where(departement_dpe['nb_log'] != 0, np.round((departement_dpe['nb_log_dpe'] / departement_dpe['nb_log'])*100, 0), np.nan)
    departement_dpe['taux_dpe'] = departement_dpe['taux_dpe'].astype(int)
    departement_dpe = departement_dpe.drop(columns=['nb_log_dpe', 'nb_log'])

    return departement_dpe
    

def get_taux_potentiel_par_departement(df: gpd.GeoDataFrame) -> gpd.GeoDataFrame:

    df_final_merge_preca = df[df['precarite_energetique'].isin([4,5])]

    total_logement_departement = df_final_merge_preca[df_final_merge_preca['precarite_energetique']==5][["libelle_departement", "nb_log"]].groupby(["libelle_departement"]).sum("nb_log").reset_index()
    total_potentiel_departement = df_final_merge_preca[df_final_merge_preca["potentiel_energetique"]==1][["libelle_departement", "nb_log"]].groupby(["libelle_departement"]).sum("nb_log").reset_index().rename(columns = {'nb_log' : 'nb_log_potentiel'})

    departement_potentiel = total_potentiel_departement.merge(total_logement_departement, on='libelle_departement', how = 'left')
    departement_potentiel['taux_potentiel'] = np.where(departement_potentiel['nb_log'] != 0, np.round((departement_potentiel['nb_log_potentiel'] / departement_potentiel['nb_log'])*100, 0), np.nan)
    departement_potentiel['taux_potentiel'] = departement_potentiel['taux_potentiel'].astype(int)
    departement_potentiel = departement_potentiel.drop(columns=['nb_log_potentiel', 'nb_log'])

    return departement_potentiel

def generate_filter_data(df: gpd.GeoDataFrame, filters) -> gpd.GeoDataFrame:

    df = df[df['code_commune_insee'] == int(filters["code_commune_insee"])]

    if len(filters["dpe"]) != 0:
        df = df[df['dpe'].isin(filters["dpe"])]
    if len(filters["ges"]) != 0:
        df = df[df['ges'].isin(filters["ges"])]
    if len(filters["score_preca"]) != 0:
        df = df[df['precarite_energetique'].isin(list(map(int, filters["score_preca"])))]
    if len(filters["confiance"]) != 0:
        print(filters["confiance"])
        df = df[df['confiance'].isin(list(map(int, filters["confiance"])))]

    if filters["potentiel"] == "true":
         df = df[~df['batiment_id_associe'].isnull()]

    df["libelle_commune_insee_associe"] = df["libelle_commune_insee_associe"].fillna("")
    df["adresse_associe"] = df["adresse_associe"].fillna("")
    df["batiment_dpe_associe"] = df["batiment_dpe_associe"].fillna("")

    return df


def rename_column_for_datatable(df: gpd.GeoDataFrame) -> gpd.GeoDataFrame:

    df = df[["libelle_departement", 
             "libelle_commune_insee", 
             "adresse", 
             "nb_log", 
             "dpe", 
             "ges", 
             "precarite_energetique", 
             "confiance", 
             "libelle_commune_insee_associe", 
             "adresse_associe", 
             "batiment_dpe_associe"
             ]]
    
    df['nb_log'] = df['nb_log'].astype('int')
    
    columns_rename = {
         "libelle_departement" : "Departement",
         "libelle_commune_insee" : "Commune",
         "adresse" : "Adresse",
         "nb_log" : "Nombre de logements",
         "dpe" : "DPE",
         "ges" : "GES",
         "precarite_energetique" : "Score Précarite",
         "confiance" : "Confiance",
         "libelle_commune_insee_associe" : "Potentiel - Commune",
         "adresse_associe" : "Potentiel - Adresse",
         "batiment_dpe_associe" : "Potentiel - DPE"
    }

    df = df.rename(columns = columns_rename)

    return df
