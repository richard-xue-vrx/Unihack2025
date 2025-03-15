class Matcher:

    def __init__(self):
        self.persons = {}
        # [(email, email, is_lover, score_percentage)]
        self.matches = []

    def add_person(self, person):
        self.persons.append(person)

    def get_person(self, email):
        return self.persons[email]
