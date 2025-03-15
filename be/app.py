from flask import Flask, request, Response, jsonify

# import pickle
import json

"""
- Collection of different BE APIs here
Require:
- Homepage Endpoint, "/"
- Form Submission Endpoint, "/v1/formSubmit"
- Leaderboard Endpoint, "/v1/leaderboard" 
"""

app = Flask(__name__)
USER_DATA = "user_data.json"


@app.route("/", methods=["GET"])
def home():
    return "Hello Gois"


"""
Backend API for receiving completed Frontend Forms
Fronted Form assumed to be proper JSON
Stored locally under JSON File (TODO: Pickling for efficiency?)
Returns JSON Response w/ message and status code
"""


@app.route("/v1/formSubmit", methods=["POST"])
def formSubmit():
    if request.method != "POST":
        return jsonify({"error": "Incorrect POST Method"}), 400
    elif not request.is_json:
        return jsonify({"error": "Expected JSON file"}), 400

    new_data = request.get_json()
    user_email = new_data.get("email")

    try:
        # Safety check to see if previous data exists
        try:
            with open(USER_DATA, "r") as FILE:
                all_data = json.load(FILE)
        except:
            all_data = {}

        print(all_data)
        # Store data under unique email
        all_data[user_email] = new_data

        # Write again w/ new data
        with open(USER_DATA, "w") as FILE:
            json.dump(all_data, FILE)

    except Exception as e:
        return jsonify({"error": f"Failed to store user submission, {str(e)}"}), 500

    return jsonify({"message": "OK"}), 200
