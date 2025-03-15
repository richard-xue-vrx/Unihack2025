from person import Person
from matching_algos.cosine_similarity import cosine_similarity

johndoe_data = {
    "email" : "johndoe@email.com",
    "first_name" : "john",
    "last_name" : "doe",
    "age" : 20, 
    "gender": "m",
    "sexuality" : "f",
    "category_weights" : {
        "personality" : 5,
        "morals": 3,
        "interest_hobbies": 2,
        "life_goals": 1,
        "love_languages": 4,
        "lifestyle": 3
    },
    "questions" :  [
        {
            "category_name" : "personality",
            "question_type" : "BINARY",
            "is_self_question" : True,
            "is_similar_question" : False,
            "question_text": "What sounds more fun?",
            "answers" : [
                {"A last minute road trip" : 0},
                {"A cozy night at home" : 1}
            ]
        }, 
        {
            "category_name" : "personality",
            "question_type" : "BINARY",
            "is_self_question" : False,
            "is_similar_question" : False,
            "question_text": "How do you feel about last-minute plans?",
            "answers" : [
                {"Love them!" : 1},
                {"Not a fan - I like plans" : 0}
            ]
        }, 
        {
            "category_name" : "interest_hobbies",
            "question_type" : "RANKED",
            "is_self_question" : True,
            "is_similar_question" : True,
            "question_text": "If you had a free day, what would you most likely do?",
            "answers" : [
                {"Binge-watch a new show" : 10},
                {"Hit the gym or go for a hike" : 3},
                {"Read a book or listen to a podcast" : 8},
                {"Go out and explore the city" : 2}
            ]
        },
        {
            "category_name" : "life_goals",
            "question_type" : "SCALE",
            "is_self_question" : True,
            "is_similar_question" : True,
            "question_text": "How ambitious are you? (1-10)  ",
            "answers" : [
                {"How ambitious are you?" : 5}
            ]
        },
        {
            "category_name" : "morals",
            "question_type" : "BINARY",
            "is_self_question" : True,
            "is_similar_question" : True,
            "question_text": "Best friends wedding and you discover their partner is cheating, do you tell them?",
            "answers" : [
                {"Yes" : 1},
                {"No" : 0}
            ]
        }
    ]
}


janedoe_data = {
    "email" : "janedoe@email.com",
    "first_name" : "jane",
    "last_name" : "doe",
    "age" : 21, 
    "gender": "f",
    "sexuality" : "m",
    "category_weights" : {
        "personality" : 2,
        "morals": 1,
        "interest_hobbies": 5,
        "life_goals": 1,
        "love_languages": 4,
        "lifestyle": 3
    },
    "questions" :  [
        {
            "category_name" : "personality",
            "question_type" : "BINARY",
            "is_self_question" : True,
            "is_similar_question" : False,
            "question_text": "What sounds more fun?",
            "answers" : [
                {"A last minute road trip" : 0},
                {"A cozy night at home" : 1}
            ]
        }, 
        {
            "category_name" : "personality",
            "question_type" : "BINARY",
            "is_self_question" : False,
            "is_similar_question" : False,
            "question_text": "How do you feel about last-minute plans?",
            "answers" : [
                {"Love them!" : 0},
                {"Not a fan - I like plans" : 1}
            ]
        }, 
        {
            "category_name" : "interest_hobbies",
            "question_type" : "RANKED",
            "is_self_question" : True,
            "is_similar_question" : True,
            "question_text": "If you had a free day, what would you most likely do?",
            "answers" : [
                {"Binge-watch a new show" : 9},
                {"Hit the gym or go for a hike" : 10},
                {"Read a book or listen to a podcast" : 2},
                {"Go out and explore the city" : 3}
            ]
        },
        {
            "category_name" : "life_goals",
            "question_type" : "SCALE",
            "is_self_question" : True,
            "is_similar_question" : True,
            "question_text": "How ambitious are you? (1-10)  ",
            "answers" : [
                {"How ambitious are you?" : 2}
            ]
        },
        {
            "category_name" : "morals",
            "question_type" : "BINARY",
            "is_self_question" : True,
            "is_similar_question" : True,
            "question_text": "Best friends wedding and you discover their partner is cheating, do you tell them?",
            "answers" : [
                {"Yes" : 0},
                {"No" : 1}
            ]
        }
    ]
}


john = Person(johndoe_data)
jane = Person(janedoe_data)

print("John Doe Self Profile Vector:")
print(john.self_answer_weights)

print("\nJohn Doe Preferred Partner Profile Vector:")
print(john.pref_partner_answer_weights)

print("\nJane Doe Self Profile Vector:")
print(jane.self_answer_weights)

print("\nJane Doe Preferred Partner Profile Vector:")
print(jane.pref_partner_answer_weights)

janetoJohnsimilarity = cosine_similarity(john.self_answer_weights, jane.pref_partner_answer_weights)
print("\nJane to John Cosine Similarity:")
print(janetoJohnsimilarity)
johnToJanesimilarity = cosine_similarity(jane.self_answer_weights, john.pref_partner_answer_weights)
print("\nJohn to Jane Cosine Similarity:")
print(johnToJanesimilarity)