import math

def cosine_similarity(dict1, dict2):
    '''
    Compute cosine similarity between two dictionaries.

    Args:
    dict1 (dict): First dictionary of question-answer pairs.
    dict2 (dict): Second dictionary of question-answer pairs.

    Returns:
        float: Cosine similarity between the two dictionaries.
    '''
    dot_product = 0
    for key in dict1:
        if key in dict2:
            dot_product += dict1[key] * dict2[key]
    magnitude1 = math.sqrt(sum([x**2 for x in dict1.values()]))
    magnitude2 = math.sqrt(sum([x**2 for x in dict2.values()]))
    return dot_product / (magnitude1 * magnitude2) if magnitude1 * magnitude2 != 0 else 0

if __name__ == "__main__":
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