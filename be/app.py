from flask import Flask, request, Response, jsonify
from matcher import Matcher
from person import Person
# import pickle
import json
import smtplib
from email.message import EmailMessage


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
    if request.method != "GET":
        return jsonify({"error": "Incorrect GET Method"}), 400

    leaderboard = sorted(matcher.matches, key=lambda m: -m[3])[:10]
    return jsonify({"message": "OK", "leaderboard": leaderboard}), 200


"""
    Send out email to successfully matched Couple
    Email contents dependant on lover/friend match
"""


def craft_email(left_email, right_email, is_lover, email_password):
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    EMAIL_ADDRESS = "unihack2025ProgChallenged@gmail.com"
    EMAIL_PASSWORD = email_password

    date = Matcher.get_person(left_email)
    recipient = Matcher.get_person(right_email)

    try:
        msg = EmailMessage()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = [right_email]
        msg["Subject"] = "You've got a match!"

        # Lover or Friend Email
        if (is_lover):
            msg.set_content(f"""
                Dear {recipient["first_name"]}, \n

                Congratulations! We've crunched the numbers and done the math, and you've found a lucky partner to reach out to. \n

                Their initials are {date["first_name"][0]}.{date["last_name"][0]}, and their email is {left_email}. \n

                We wish you both the best of luck :) \n
            """)
        else:
            msg.set_content(f"""
                Dear {recipient["first_name"]}, \n

                Unfortunately, after we crunched the numbers and done the math, we couldn't find that perfect partner for you this time. \n

                On the bright side of life, we've found a friend match for you; while it might not be the same, it might just be what you wanted all along. \n

                Their initials are {date["first_name"][0]}.{date["last_name"][0]}, and their email is {left_email}. \n

                We hope you both get to meet soon :) \n

            """)

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Secure connection
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print(f"Email for {left_email}, {right_email} failed")


def lonely_email(recipient_email, email_password):
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    EMAIL_ADDRESS = "unihack2025ProgChallenged@gmail.com"
    EMAIL_PASSWORD = email_password

    recipient = Matcher.get_person(recipient_email)

    try:
        msg = EmailMessage()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = [recipient_email]
        msg["Subject"] = "Matching Results"

        msg.set_content(f"""
                Dear {recipient["first_name"]}, \n

                Unfortunately, we were unable to find someone for you this time. This is not due to any fault of your own; 
                with the odd number of people we had, there was exactly one person who was unable to get a match. You have the
                special status of being that one person. \n

                On the bright side, you've achieved the most improbable result of everyone who participated, and you should be proud
                at your ability to beat the odds. \n 

                We hope to see you again, with a better roll of the dice!

            """)
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Secure connection
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print(f"Email for lone person failed")


@app.route("/v1/emailSend", methods=["POST"])
def send_email():
    if request.method != "POST":
        return jsonify({"error": "Incorrect POST Method"}), 400

    with open("secret.txt", "r") as FILE:
        EMAIL_PASSWORD = FILE.readline().strip()
        for left_email, right_email, is_lover in matcher.matches():
            craft_email(left_email, right_email, is_lover, EMAIL_PASSWORD)
            craft_email(right_email, left_email, is_lover, EMAIL_PASSWORD)

        if len(matcher.persons) % 2 == 1:
            # Odd person out
            all_emails = set(person.get_email()
                             for person in matcher.persons)
            matched_emails = set(
                email for match in matcher.matches for email in match[:2])

            unmatched_email = next(iter(all_emails - matched_emails))
            lonely_email(unmatched_email, EMAIL_PASSWORD)
    return jsonify({"message": "OK"}), 200
