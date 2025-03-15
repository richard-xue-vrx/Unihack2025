from flask import Flask, request, Response, jsonify
from matcher import Matcher
from person import Person
# import pickle
import json

"""
- Collection of different BE APIs here
Require:
- Homepage Endpoint, "/"
- Survey Submission Endpoint, "/v1/surveySubmit"
- Leaderboard Endpoint, "/v1/leaderboard" 
"""

app = Flask(__name__)
USER_DATA = "user_data.json"
matcher = Matcher()


@app.route("/", methods=["GET"])
def home():
    return "Hello Gois"


"""
    Backend API for receiving completed Frontend Forms
    Receives a given Survey JSON corresponding to a certain person.
    Stores the entire person's responses to local storage, 
    Creating a new Person and adding to Matcher
"""


@app.route("/v1/surveySubmit", methods=["POST"])
def surveySubmit():
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

        # Store data under unique email
        all_data[user_email] = new_data

        # Write again w/ new data
        with open(USER_DATA, "w") as FILE:
            json.dump(all_data, FILE)

        # Create Person
        matcher.append(Person(new_data))

    except Exception as e:
        return jsonify({"error": f"Failed to store user submission, {str(e)}"}), 500

    return jsonify({"message": "OK"}), 200


"""
Returns a JSON file containing leaderboard information
TODO: Limit to maybe top 10?

Contains: LHS Initial, RHS Initial, Match Percentage
{
    "leaderboard" : [
        {
            
        },
        {
            
        }...
    ]
}

"""


@app.route("/v1/leaderboard", methods=["GET"])
def leaderboard():
    pass
