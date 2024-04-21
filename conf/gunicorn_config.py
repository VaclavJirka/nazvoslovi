import os

command = "/usr/local/bin/gunicorn"
pythonpath = os.path.dirname(os.path.abspath(__file__))
bind = "127.0.0.1:8000"
workers = 3
user = os.getlogin()
limit_request_fields = 32000
limit_request_field_size = 0
raw_env = f'DJANGO_SETTINGS_MODULE={os.environ.get("DJANGO_SETTINGS_MODULE", "nazvoslovi.settings")}'
