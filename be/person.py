
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

        # User Info, Category Weights
        self.category_weights = {}
        self.questions = []
        self.process_survey()

    def process_survey(self):
        self.self_info = {
            "email": self.survey_json["email"],
            "first_name": self.survey_json["first_name"],
            "last_name": self.survey_json["last_name"],
            "age": self.survey_json["age"],
            "gender": self.survey_json["gender"],
            "sexuality": self.survey_json["sexuality"],
            "religion_own": self.survey_json["religion_own"],
            "religion_partner": self.survey_json["religion_partner"],
        }

        self.category_weights = self.survey_json["category_weights"]

        # Process Questions
        question_factory = QuestionFactory()
        for question in self.survey_json["questions"]:
            self.questions.append(question_factory.create_question(question))


class QuestionFactory:

    def __init__(self):

        pass

    def create_question(question_json):

        # Pass in the type of Question from the FE
        question_type = question_json["question_type"]


class Question:
    def __init__(self, question_type):
        self.category_id = category_id
        pass


class BinaryQuestion (Question):
    pass


class RankedQuestion (Question):
    pass


class ScaleQuestion (Question):
    pass
