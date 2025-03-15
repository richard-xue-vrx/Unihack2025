import math

# modified to ignore keys - just ordering of keys
def cosine_similarity(dict1, dict2):
    '''
    Compute cosine similarity between two dictionaries by treating them as ordered vectors,
    ignoring the keys and using the order of insertion.
    
    Args:
    dict1 (dict): First dictionary of question-answer pairs.
    dict2 (dict): Second dictionary of question-answer pairs.

    Returns:
        float: Cosine similarity between the two dictionaries.
    '''
    vec1 = list(dict1.values())
    vec2 = list(dict2.values())
    
    if len(vec1) != len(vec2):
        raise ValueError("Dictionaries must have the same number of values.")
    
    dot_product = sum(x * y for x, y in zip(vec1, vec2))
    magnitude1 = math.sqrt(sum(x**2 for x in vec1))
    magnitude2 = math.sqrt(sum(x**2 for x in vec2))
    
    return dot_product / (magnitude1 * magnitude2) if magnitude1 and magnitude2 else 0


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
