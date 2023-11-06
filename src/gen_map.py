import pandas as pd

import geopandas as gpd
import folium
from folium.plugins import MarkerCluster
from prioreno.data_processing.get_data import get_data

def main():
    gdf_data = get_data()
    gdf_data = gdf_data[gdf_data['libelle_commune_insee']=='Rouen']

    # xmin, ymin, xmax, ymax = -5, 41, 9, 51  # Limites pour afficher la France

    # center = [(ymin + ymax) / 2, (xmin + xmax) / 2]
   
    center = [49.443232, 1.099971]

    m = folium.Map(location=center, zoom_start=15)

    for _, r in gdf_data.iterrows():
        longitude, latitude = r["geometry"].x, r["geometry"].y

        match r["precarite_energetique"]:
            case 1:
                circle_color = "rgba(255,255,127,255)"
            case 2:
                circle_color = 'rgba(224,197,89,255)'
            case 3:
                circle_color = 'rgba(192,139,58,255)'
            case 4:
                circle_color = 'rgba(163,84,32,255)'
            case 5:
                circle_color = 'rgba(131,37,12,255)'

        folium.Circle(
            location=[latitude, longitude],
            radius=5,  # Rayon du cercle en mètres
            color=circle_color,  # Couleur de la bordure
            fill=True,
            fill_opacity=0.8,
            popup=f"{r['adresse']} {r['libelle_commune_insee']}\nPrécarité énergétique niveau {r['precarite_energetique']}"
        ).add_to(m)

    m.save('carte_rouen.html')

if __name__ == "__main__":
    main()