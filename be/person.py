

class Matcher:

    def __init__(self):
        self.persons = []

    def add_person(self, person):
        self.persons.append(person)

# Person gets populated


class Person:

    def __init__(self, survey_json):
        self.survey_json = survey_json

        # Process thru the survey_json to find own info/preferences
        self.self_info = {}

        # Preferred Partner for
        self.preferred_info = {}

        # Used in Gale-Shapely
        self.preferred_partners = []

    pass


class QuestionFactory:

    def __init__(self):

        # Pass in the type of Question from the FE

        if (question == "BINARY"):

        elif (question == "RANKED"):

        else:


class Question:
    def __init__(self, category_id, question_text, answers):
        self.category_id = category_id
        pass


class BinaryQuestion (Question):
    pass


class RankedQuestion (Question):
    pass


class ScaleQuestion (Question):
    pass
