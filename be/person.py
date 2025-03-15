
# Person gets populated
import math
class Person:
    def __init__(self, survey_json):
        self.survey_json = survey_json

        self.self_info = {
            "email": self.survey_json["email"],
            "first_name": self.survey_json["first_name"],
            "last_name": self.survey_json["last_name"],
            "age": self.survey_json["age"],
            "gender": self.survey_json["gender"],
            "sexuality": self.survey_json["sexuality"],
        }

        self.category_weights = self.survey_json["category_weights"]

        # User Info, Category Weights
        self.questions = []
        self.process_survey()

        # weights for your own traits, weights for what you would like in a partner
        self.self_answer_weights, self.pref_partner_answer_weights = self.build_profile_vector()

    def get_self_answer_weights(self):
        return self.self_answer_weights

    def get_pref_partner_answer_weights(self):
        return self.pref_partner_answer_weights

    def get_email(self):
        return self.self_info["email"]

    def get_gender(self):
        return self.self_info["gender"]

    def get_sexuality(self):
        return self.self_info["sexuality"]

    def process_survey(self):
        # Process Questions
        question_factory = QuestionFactory()
        for question in self.survey_json["questions"]:
            self.questions.append(question_factory.create_question(question))

    def build_profile_vector(self):
        """
        Builds a profile vector for the user and their preferred partner
        """
        self_answer_weights, pref_partner_answer_weights = {}, {}

        for question in self.questions:
            if question.is_self_question:
                self_answer_weights.update(
                    question.encode(self.category_weights))
            if not question.is_self_question or question.is_similar_question:
                pref_partner_answer_weights.update(
                    question.encode(self.category_weights))

        return (self_answer_weights, pref_partner_answer_weights)


class QuestionFactory:

    def __init__(self):
        pass

    def create_question(self, question_json):
        question_type = question_json.get("question_type", "").upper()
        if question_type == "BINARY":
            return BinaryQuestion(question_json)
        elif question_type == "RANKED":
            return RankedQuestion(question_json)
        elif question_type == "SCALE":
            return ScaleQuestion(question_json)
        else:
            raise ValueError(f"Unknown question type: {question_type}")


class Question:
    def __init__(self, question_json):
        self.category_name = question_json.get("category_name", None)
        self.question_type = question_json.get("question_type", "").upper()
        self.is_self_question = question_json.get("is_self_question", True)
        self.is_similar_question = question_json.get(
            "is_similar_question", True)
        self.question_text = question_json.get("question_text", "")
        self.answers = question_json.get("answers", [])


class BinaryQuestion (Question):
    def __init__(self, question_json):
        super().__init__(question_json)
        # so that it has same wieght as a ranked question (which has 4 dimensions)
        # scale to /10
        self.question_type_weight = math.sqrt(2) * 10

    def encode(self, category_weights):
        """
        We are going to encode the binary question into a category vector
        Selected answer is 1, unselected answer is 0
        This is multiplied by the category weight (how important is this category to them) and the question type weight (1).
        Final result is returned as a dict to be appended to the user's profile vector
        """

        category_weight = scaleCategoryWeight(
            category_weights.get(self.category_name, 1))

        answer_weights = {}

        for answer in self.answers:
            for answer_text, value in answer.items():
                encoded_key = f"{self.question_text} - {answer_text}"
                if value == 1:
                    value *= category_weight * self.question_type_weight
                    answer_weights[encoded_key] = value
                elif value == 0:
                    answer_weights[encoded_key] = 0

        return answer_weights


class RankedQuestion (Question):
    def __init__(self, question_json):
        super().__init__(question_json)
        self.question_type_weight = 1

    def encode(self, category_weights):
        """
        Assume each one has a ranking 1-10
        multiplies ranking with category weight and question type weight
        Returns dict mapping of each answer to its weighted ranking
        """
        category_weight = scaleCategoryWeight(
            category_weights.get(self.category_name, 1))

        answer_weights = {}
        for answer in self.answers:
            for answer_text, ranking in answer.items():
                # Center ranking for 5.5 midpoint.
                centered_ranking = ranking - 5.5
                encoded_key = f"{self.question_text} - {answer_text}"
                answer_weights[encoded_key] = centered_ranking * \
                    category_weight * self.question_type_weight
        return answer_weights


class ScaleQuestion (Question):
    def __init__(self, question_json):
        super().__init__(question_json)
        # so that it has same wieght as a ranked question (which has 4 dimensions)
        # scale to 10
        self.question_type_weight = 2 * 2

    def encode(self, category_weights):
        """
        Assume each one has a ranking 1-5
        multiplies ranking with category weight and question type weight
        Returns dict mapping of each answer to its weighted ranking
        """
        category_weight = scaleCategoryWeight(
            category_weights.get(self.category_name, 1))

        answer_weights = {}
        for answer in self.answers:
            for answer_text, ranking in answer.items():
                # Center ranking for 5.5 midpoint.
                centered_ranking = ranking - 3
                encoded_key = answer_text
                answer_weights[encoded_key] = centered_ranking * \
                    category_weight * self.question_type_weight
        return answer_weights


def scaleCategoryWeight(rating):
    """
    Scale the category weight based on the rating
    """

    if rating < 1 or rating > 5:
        raise ValueError("Rating must be between 1 and 5.")
    factor = 0.5 + (rating - 1) * 0.25
    return factor
