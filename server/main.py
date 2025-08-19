from flask import Flask


WEBSITE_DIR = "../front-end/"

app = Flask(__name__, static_folder=WEBSITE_DIR, static_url_path='')


@app.route('/')
def home():
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5335);
