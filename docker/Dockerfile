# Utilisez une image de base Python
FROM python:3.9-slim


RUN apt-get update && apt-get install -y gdal-bin libgdal-dev g++


# Copiez le contenu du répertoire actuel dans /app dans l'image
COPY . /app

# Définissez le répertoire de travail
WORKDIR /app

# Installez les dépendances à partir de requirements.txt
RUN pip install -r requirements.txt



# Exposez le port sur lequel votre application Flask écoute
EXPOSE 8000

ENV PYTHONPATH="/app/src"


# Commande pour lancer votre application Flask avec Gunicorn
#CMD ["gunicorn", "-w", "4", "wsgi:gunicorn_app"]
RUN sed -i 's/\r$//' docker/entrypoint.sh
ENTRYPOINT ["/bin/bash", "docker/entrypoint.sh"]