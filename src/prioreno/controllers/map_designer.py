import pandas as pd
import geopandas as gpd
from folium import GeoJsonTooltip, Marker, Icon, TileLayer
import folium
import branca.colormap as cm

NORMANDIE_LATITUDE = 49.4634
NORMANDIE_LONGITUDE = 0.5258

def generate_default_map() :

    m = folium.Map(location=[NORMANDIE_LATITUDE, NORMANDIE_LONGITUDE], zoom_start=8, control_scale=True,
                   tiles="cartodbpositron")

    folium.TileLayer(
        tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', attr=(
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
            'contributors, &copy; <a href="https://opentopomap.org/attributions">OpenTopoMap</a>'
        ), name="Forêts & Reliefs").add_to(m)

    return m


def generate_filtered_map(df: gpd.GeoDataFrame):

    latitude_moyenne = df.geometry.y.mean()
    longitude_moyenne = df.geometry.x.mean()

    m = folium.Map(location=[latitude_moyenne, longitude_moyenne], zoom_start=12, control_scale=True,
                   tiles="cartodbpositron")

    folium.TileLayer(
        tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', attr=(
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
            'contributors, &copy; <a href="https://opentopomap.org/attributions">OpenTopoMap</a>'
        ), name="Forêts & Reliefs").add_to(m)

    for _, r in df.iterrows():
        longitude, latitude = r.geometry.x, r.geometry.y

        colors = {
            1: "rgba(255, 255, 127, 1)",
            2: "rgba(224, 197, 89, 1)",
            3: "rgba(192, 139, 58, 1)",
            4: "rgba(163, 84, 32, 1)",
            5: "rgba(131, 37, 12, 1)"
        }

        circle_color = colors.get(r.precarite_energetique, "rgba(0, 0, 0, 1)") 

        max_popup_width = 300

        popup_text = f"{r['adresse']} - {r['libelle_commune_insee']}<br>Précarité énergétique : {r['precarite_energetique']}<br>DPE : {r['dpe']}<br>Confiance : {r['confiance']}"

        folium.Circle(
            location=[latitude, longitude],
            radius=5,  # Rayon du cercle en mètres
            color=circle_color,  # Couleur de la bordure
            fill=True,
            fill_opacity=0.8,
            popup=folium.Popup(popup_text, max_width=max_popup_width)
        ).add_to(m)

    return m