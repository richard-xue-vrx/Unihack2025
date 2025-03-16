import math
import json

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

    len_diff = abs(len(vec1) - len(vec2))

    # Pad the shorter list with zeroes
    if len(vec1) < len(vec2):
        vec1.extend([0.0] * len_diff) 
    elif len(vec2) < len(vec1):
        vec2.extend([0.0] * len_diff) 

    dot_product = sum(x * y for x, y in zip(vec1, vec2))
    magnitude1 = math.sqrt(sum(x**2 for x in vec1))
    magnitude2 = math.sqrt(sum(x**2 for x in vec2))

    return dot_product / (magnitude1 * magnitude2) if magnitude1 and magnitude2 else 0

def cosine_similarity_with_age_exp(dict1, dict2, age1, age2, alpha=0.1):
    """
    Computes an adjusted cosine similarity score that incporporates the relative age difference between two people
    using an exponential falloff.
    multiplier = L + (U - L) / (1 + exp(a * (diff - T)))

    """

    base_similarity = cosine_similarity(dict1, dict2)

    normalized_similarity = (base_similarity + 1) / 2

    age_diff = abs(age1 - age2)

    age_base = min(age1, age2)

    if age_base < 18 and max(age1, age2) > 18:
        # eyebrow emoji
        return -1
    if age_base < 20:
        U = 1.0 # no penalty for very small diff
        L = 0.1  # minumum multiplier for large differences
        T = 2.5 # difference threshold (in years)
        a = 3.5  # drop steepness
    elif age_base < 26:
        U = 1.0 # no penalty for very small diff
        L = 0.35  # minumum multiplier for large differences
        T = 2.5 # difference threshold (in years)
        a = 2.0  # drop steepness
    else:
        U = 1.0
        L = 0.85
        T = 3.0
        a = 1.5

    multiplier = L + (U - L) / (1 + math.exp(a * (age_diff - T)))

    # apply the penalty
    adjusted_similarity = normalized_similarity * multiplier

    final_similarity = adjusted_similarity * 2 - 1

    return final_similarity


# if __name__ == "__main__":
#     dict1 = {
#         'How important is honesty to you?': 9,
#         'How do you handle conflict?': 8,
#         'Do you prefer structure or spontaneity?': 7
#     }

#     dict2 = {
#         'How important is honesty to you?': 7,
#         'How do you handle conflict?': 8,
#         'Do you prefer structure or spontaneity?': 6
#     }

#     similarity = cosine_similarity(dict1, dict2)
#     print(f"Cosine similarity is {similarity}")
