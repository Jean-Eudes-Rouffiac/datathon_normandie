#!/bin/bash

mkdir -p /deploy/logs
touch /deploy/logs/error.log
touch /deploy/logs/access.log

python -m gunicorn --workers 4  -b 0.0.0.0:8000 --timeout 600 'wsgi:gunicorn_app'