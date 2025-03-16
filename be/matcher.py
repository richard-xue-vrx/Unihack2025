from matching_algos.cosine_similarity import cosine_similarity_with_age_exp
from matching_algos.gale_shapley import gale_shapley
import json
from person import Person


USER_WEIGHTS_DATA = "user_weights.json"

def split_groups(preference_list):
    """
    Dynamically splits participants into two groups.
    """
    participants = list(preference_list.keys())
    mid = len(participants) // 2
    group_A = set(participants[:mid])
    group_B = set(participants[mid:])
    return group_A, group_B


def filter_preferences(preference_list, group_A, group_B):
    """
    Ensures that preferences are directed at the opposite group.
    """
    filtered = {}
    for person, prefs in preference_list.items():
        filtered[person] = [(p, score) for p, score in prefs if p in (
            group_B if person in group_A else group_A)]
    return filtered

# create this class when we want to run the matches
class Matcher:

    def __init__(self):
        self.persons = {}
        # [(email, email, is_lover, score_percentage)]
        self.matches = []

    def add_person(self, person):
        self.persons[person.get_email()] = person
        return person

    def get_person(self, email):
        return self.persons[email]
    
    def load_persons(self):
        self.persons = {}
        try:
            with open(USER_WEIGHTS_DATA, "r") as FILE:
                data = json.load(FILE)
        except Exception as e:
            data = {}
        
        # Iterate through each entry in the JSON file
        for email, weights in data.items():
            try:
                person = Person.from_profile(
                    self_info=weights["person_info"],
                    self_answer_weights=weights["self_weights"],
                    pref_partner_answer_weights=weights["partner_weights"]
                )
                self.persons[person.get_email()] = person
            except Exception as e:
                print(f"Error creating Person for {email}: {e}")
                continue

    def generate_matches(self):
        """
            Generate matches in order of preference for 
            all preferred genders and sexual preferences supported
        """
        self.load_persons()

        male_male = []
        female_female = []
        male_female = []
        female_male = []

        for person in self.persons.values():
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
        male_female_prefs = self.generate_group_preferences(
            male_female, female_male)
        female_male_prefs = self.generate_group_preferences(
            female_male, male_female)

        men_partners, _ = gale_shapley(
            male_female_prefs, female_male_prefs)

        if men_partners is not None:
            for match, tup in men_partners.items():
                if tup:
                    other, is_lover, cosine = tup
                    self.matches.append((match, other, is_lover, cosine))

        def same_sex_matching(group_a, group_b):
            """
            Args:
                group_a ({ person_email: [(partner_email, cosine_similarity)]})
                group_b ({ person_email: [(partner_email, cosine_similarity)]})

            Matches Gale-Shapely when both groups co-date each other,
            Filtered preferences and split groups prevent matching errors
            """
            pref_list = self.generate_group_preferences(
                group_a, group_b)
            a, b = split_groups(pref_list)

            filtered_a, filtered_b = filter_preferences(
                pref_list, a, b), filter_preferences(pref_list, b, a)
            result = gale_shapley(male_female_prefs, female_male_prefs)

            if result is None:
                raise ValueError("gale_shapley() returned None instead of a tuple")

            matches, _ = result  # Unpacking only if valid

            if matches is not None:
                for match, matchInfo in matches.items():
                    if matchInfo is not None:
                        self.matches.append((match, other, is_lover, cosine))
        
        same_sex_matching(male_male, male_male)
        same_sex_matching(female_female, female_female)

        self.matches = remove_duplicate_matches(self.matches)

    def generate_group_preferences(self, people, preferred_partners):
        """
        Params: Person[], Person[]

            Takes in a list of people, and a list of preferred_partners all people would be willing to date.
            Calculates cosine similarity between all possible pairs, and returns preferences in order

        Returns:
            { person_email: [(partner_email, cosine_similarity)]}
        """
        preferences = {}
        for left_person in people:
            matches = []
            for right_person in preferred_partners:
                if (left_person.get_email() != right_person.get_email()):
                    matches.append(
                        (right_person.get_email(), cosine_similarity_with_age_exp(left_person.get_pref_partner_answer_weights(), right_person.get_self_answer_weights(), left_person.get_age(), right_person.get_age())))

            matches.sort(key=lambda match: -match[1])
            preferences[left_person.get_email()] = matches
        return preferences


# if __name__ == "__main__":
#     matcher = Matcher()
#     male_male_pref_list = {
#         "a": [("b", 0.8), ("c", 0.7), ("d", 0.5), ("e", 0.3)],
#         "b": [("c", 0.8), ("d", 0.6), ("e", 0.4), ("a", 0.2)],
#         "c": [("d", 0.9), ("e", 0.7), ("a", 0.5), ("b", 0.3)],
#         "d": [("e", 0.8), ("a", 0.6), ("b", 0.4), ("c", 0.2)],
#         "e": [("d", 0.9), ("b", 0.7), ("c", 0.5), ("a", 0.3)]
#     }
#     male_a, male_b = split_groups(male_male_pref_list)

#     filtered_a, filtered_b = filter_preferences(
#         male_male_pref_list, male_a, male_b), filter_preferences(male_male_pref_list, male_b, male_a)

#     # Run the stable matching algorithm
#     mPartner, wPartner = gale_shapley(filtered_a, filtered_b)

#     print("Final Stable Matches:")
#     for man, woman in mPartner.items():
#         print(f"{man} ⟶ {woman if woman else 'Unmatched'}")

def remove_duplicate_matches(matches):
    """
    Removes duplicate matches from the list of tuples (match, other, is_lover, cosine).
    Ensures that each pair appears only once in the final list.
    """
    unique_matches = set()
    cleaned_matches = []

    for match in matches:
        # Sort the tuple so that (A, B) is the same as (B, A)
        match_pair = tuple(sorted(match[:2]))

        if match_pair not in unique_matches:
            unique_matches.add(match_pair)
            cleaned_matches.append(match)

    return cleaned_matches