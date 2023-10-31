import pandas as pd

import geopandas as gpd
import folium
from folium.plugins import MarkerCluster

def main():
    bat_file = "data/echantillon_polygon.csv"
    bat_df = pd.read_csv(bat_file)


    # Je transforme un dataframe bat_df en geopandas dataframe en utilisant geom_groupe qui contient des POLYGON au 
    # format LAMBERT 93 ("EPSG:2154")
    bat_df_gpd = gpd.GeoDataFrame(bat_df, geometry=gpd.GeoSeries.from_wkt(bat_df["geometry"]))
    bat_df_gpd.crs = "EPSG:2154"
    bat_df_gpd = bat_df_gpd.to_crs('EPSG:4326')

    xmin, ymin, xmax, ymax = -5, 41, 9, 51  # Limites pour afficher la France

    center = [(ymin + ymax) / 2, (xmin + xmax) / 2]

    m = folium.Map(location=center, zoom_start=6)

    for _, r in bat_df_gpd.iterrows():
        sim_geo = gpd.GeoSeries(r["geometry"]).simplify(tolerance=0.001)
        geo_j = sim_geo.to_json()
        geo_j = folium.GeoJson(data=geo_j, style_function=lambda x: {"fillColor": "orange"})
        geo_j.add_to(m)

    m.save('carte/carte.html')

if __name__ == "__main__":
    main()