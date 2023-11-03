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

    for i in range(2, 16):
        url = config["data"]["url"] + str(i) + '.csv'
        df_i = pd.read_csv(url)
        df = pd.concat([df, df_i])

    df = gpd.GeoDataFrame(df, geometry=gpd.GeoSeries.from_wkt(df[config["data"]["geometry_colum"]]))
    df.crs = "EPSG:2154"

    return df

    