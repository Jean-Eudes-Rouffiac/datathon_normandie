venv:
	python -m venv venv
	. venv/bin/activate && pip install -r requirements.txt

update:
	. venv/bin/activate && pip install -r requirements.txt

start-app:
	. venv/bin/activate && export FLASK_APP=app.py && export FLASK_ENV=development && flask run