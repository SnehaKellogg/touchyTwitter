import os

import pandas as pd
import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, request
# import newsapi
# from newsapi.newsapi_client import NewsApiClient


app = Flask(__name__, static_url_path='/static')


@app.route("/")
def index():
    # """Return the homepage."""
    return render_template("index.html")


@app.route("/news")
# /v2/top-headlines
def news():
    return render_template("news.html")


@app.route("/sidebar")
def nav():
    return render_template("sidebar.html")

@app.route("/bubbles")
def bubbles():
    return render_template("index1.html")


@app.route("/map")
def worldmap():
    # """Return the homepage."""
    return render_template("Worldmap.html")

@app.route("/twitterstats")
def twitterstats():
    # """Return the homepage."""
    return render_template("whytwitter.html")



if __name__ == "__main__":
    app.run()
# port = int(os.environ.get("PORT", 5000))
# app.run(host='0.0.0.0', port=port)
