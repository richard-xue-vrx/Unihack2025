from matching_algos.cosine_similarity import cosine_similarity
from matching_algos.gale_shapley import gale_shapley


class Matcher:

    def __init__(self):
        self.persons = []
        # [(email, email, is_lover, score_percentage)]
        self.matches = []

    def add_person(self, person):
        self.persons.append(person)

    def get_person(self, email):
        return self.persons[email]

    def generate_matches(self):

        # Generate preferences in decreasing order
        # TODO Gender Matches
        # M F
        # M M
        # F F

        male_male = []
        female_female = []
        male_female = []
        female_male = []

        for person in self.persons:
            if (person.get_gender() == "m" and person.get_sexuality() == "m"):
                male_male.append(person)
            elif (person.get_gender() == "f" and person.get_sexuality() == "f"):
                female_female.append(person)
            elif (person.get_gender() == "f" and person.get_sexuality() == "m"):
                female_male.append(person)
            elif (person.get_gender() == "m" and person.get_sexuality() == "f"):
                male_female.append(person)

        # Preferences are ordered now, find matches

        # M->F and F->M
        male_female_prefs = self.generate_group_matches(
            male_female, female_male)
        female_male_prefs = self.generate_group_matches(
            female_male, male_female)

        straight_matches = gale_shapley(male_female_prefs, female_male_prefs)
        for match, (other, is_lover, cosine) in straight_matches.items():
            self.matches.append((match, other, is_lover, cosine))

        # TODO: M->M
        male_male_prefs = self.generate_group_matches(
            male_male, male_male)

        male_male_matches = gale_shapley(male_male_prefs, male_male_prefs)
        for match, (other, is_lover, cosine) in male_male_matches.items():
            self.matches.append((match, other, is_lover, cosine))

        # TODO: F->F
        female_female_prefs = self.generate_group_matches(
            female_female, female_female)

        female_female_matches = gale_shapley(
            female_female_prefs, female_female_prefs)
        for match, (other, is_lover, cosine) in female_female_matches.items():
            self.matches.append((match, other, is_lover, cosine))

    """
        Takes in a list of people, and a list of preferred_partners all people would be willing to date.
        Calculates cosine similarity between all possible pairs, and returns preferences in order

    Returns:
        { person: [(date, cosine_similarity)]}
    """

    def generate_group_matches(self, people, preferred_partners):

        preferences = {}
        for left_person in people:
            matches = []
            for right_person in preferred_partners:
                matches.append(
                    (right_person, cosine_similarity(left_person.get_pref_partner_answer_weights(), right_person.get_self_answer_weights())))

            matches.sort(key=lambda match: -match[1])
            preferences[left_person.get_email()] = matches

        return preferences


if __name__ == "__main__":
    matcher = Matcher()
    dict1 = {
        'How important is honesty to you?': 9,
        'How do you handle conflict?': 8,
        'Do you prefer structure or spontaneity?': 7
    }

    dict2 = {
        'How important is honesty to you?': 7,
        'How do you handle conflict?': 8,
        'Do you prefer structure or spontaneity?': 6
    }

    similarity = cosine_similarity(dict1, dict2)
    print(f"Cosine similarity is {similarity}")
