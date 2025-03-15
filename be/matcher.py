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
    men_preference1 = {
        "a": [("g", 0.8), ("f", 0.5), ("h", -0.2), ("e", -0.6)],
        "b": [("h", 0.9), ("g", 0.3), ("f", -0.4), ("e", -0.7)],
        "c": [("f", 0.7), ("h", 0.1), ("g", -0.5), ("e", -0.9)],
        "d": [("g", 0.6), ("e", 0.4), ("f", -0.3), ("h", -0.8)],
        "e": [("e", 0.7), ("f", 0.2), ("h", -0.1), ("g", -0.5)]
    }

    women_preference1 = {
        "e": [("b", 0.9), ("e", 0.3), ("c", 0.2), ("a", -0.4), ("d", -0.6)],
        "f": [("e", 0.8), ("b", 0.5), ("d", -0.2), ("c", -0.7), ("a", -0.9)],
        "g": [("b", 0.7), ("a", 0.6), ("d", 0.4), ("e", -0.3), ("c", -0.8)],
        "h": [("c", 0.7), ("b", 0.3), ("e", 0.1), ("d", -0.5), ("a", -0.9)]
    }
    mPartner, wPartner = gale_shapley(men_preference1, women_preference1)
    print(mPartner)
    print(wPartner)
    print("Final Stable Matches:")
    for man, woman in mPartner.items():
        print(f"{man} ⟶ {woman if woman else 'Unmatched'}")
