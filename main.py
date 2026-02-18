from flask import Flask, request, jsonify
from flask_cors import CORS
from sites.kleinanzeigen import get_kleinanzeigen_results

app = Flask(__name__)
CORS(app)

@app.route("/search", methods=["POST"])
def search():
    data = request.json
    query = data.get("query", "")
    location = data.get("location", "")
    radius = data.get("radius", 50)
    if not query:
        return jsonify([])

    results = get_kleinanzeigen_results(query, location=location, radius=radius)
    return jsonify(sorted(results, key=lambda x: x["price"]))

if __name__ == "__main__":
    app.run(debug=True)
