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

        men_partners, _ = gale_shapley(
            male_female_prefs, female_male_prefs)

        for match, (other, is_lover, cosine) in men_partners.items():
            self.matches.append((match, other, is_lover, cosine))

        # TODO: M->M
        # male_male_prefs = self.generate_group_matches(
        #     male_male, male_male)
        # proposers = {k: v for i, (k, v) in enumerate(
        #     male_male_prefs.items()) if i % 2 == 0}
        # receivers = {k: v for i, (k, v) in enumerate(
        #     male_male_prefs.items()) if i % 2 == 1}

        # male_male_matches, _ = gale_shapley(proposers, receivers)
        # for match, (other, is_lover, cosine) in male_male_matches.items():
        #     self.matches.append((match, other, is_lover, cosine))

        # # TODO: F->F
        # female_female_prefs = self.generate_group_matches(
        #     female_female, female_female)

        # female_female_matches = gale_shapley(
        #     female_female_prefs, female_female_prefs)
        # for match, (other, is_lover, cosine) in female_female_matches.items():
        #     self.matches.append((match, other, is_lover, cosine))

    """
    Params: Person[], Person[]

        Takes in a list of people, and a list of preferred_partners all people would be willing to date.
        Calculates cosine similarity between all possible pairs, and returns preferences in order

    Returns:
        { person_email: [(date_email, cosine_similarity)]}
    """

    def generate_group_matches(self, people, preferred_partners):

        preferences = {}
        for left_person in people:
            matches = []
            for right_person in preferred_partners:
                if (left_person.get_email() != right_person.get_email()):
                    matches.append(
                        (right_person.get_email(), cosine_similarity(left_person.get_pref_partner_answer_weights(), right_person.get_self_answer_weights())))

            matches.sort(key=lambda match: -match[1])
            preferences[left_person.get_email()] = matches
        return preferences


# if __name__ == "__main__":
#     matcher = Matcher()
#     men_preference2 = {
#         "a": [("b", 0.8), ("c", 0.7), ("d", 0.5), ("e", 0.3)],
#         "b": [("c", 0.8), ("d", 0.6), ("e", 0.4), ("a", 0.2)],
#         "c": [("d", 0.9), ("e", 0.7), ("a", 0.5), ("b", 0.3)],
#         "d": [("e", 0.8), ("a", 0.6), ("b", 0.4), ("c", 0.2)],
#         "e": [("d", 0.9), ("b", 0.7), ("c", 0.5), ("a", 0.3)]
#     }

#     proposer_keys = list(men_preference2.keys())[:len(men_preference2) // 2]
#     receiver_keys = list(men_preference2.keys())[len(men_preference2) // 2:]

#     proposers = {k: men_preference2[k] for k in proposer_keys}
#     receivers = {k: men_preference2[k] for k in receiver_keys}

#     print(proposers)
#     print(receivers)

#     # Run the stable matching algorithm
#     mPartner, wPartner = gale_shapley(proposers, receivers)
#     print(mPartner)
#     print(wPartner)
#     print("Final Stable Matches:")
#     for man, woman in mPartner.items():
#         print(f"{man} ⟶ {woman if woman else 'Unmatched'}")
