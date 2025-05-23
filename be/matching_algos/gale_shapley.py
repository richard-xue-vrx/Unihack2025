import collections


def wPrefersM1OverM(women_preference, w, m, m1):
    """
    Checks if woman `w` prefers current partner `m1` over new suitor `m`.
    """
    for preferred_man, _ in women_preference[w]:
        if preferred_man == m1:
            return True
        if preferred_man == m:
            return False
    return False


def gale_shapley(men_preference, women_preference):
    """
    Implements the Gale-Shapley stable matching algorithm.

    Args:
    men_preference (dict): Men's preference list (key: man, value: list of women)
    women_preference (dict): Women's preference list (key: woman, value: list of men)

    Returns:
    dict: Stable matching where each man is mapped to a woman (or None if unmatched), with Cosine
    """

    w_partner = collections.defaultdict(lambda: None)
    for w in women_preference.keys():
        w_partner[w] = None
    m_partner = collections.defaultdict(lambda: None)
    for m in men_preference.keys():
        m_partner[m] = None

    free_men = set(men_preference.keys())

    while free_men:
        m = free_men.pop()  # Pick free man
        # Tuples (Women, Cosine Similarity)
        for w, cosine in men_preference[m]:

            # If the man already engaged, stop proposing
            if m_partner[m] is not None:
                break

            if w_partner[w] is None:
                # If woman free, they get engaged
                w_partner[w] = [m, cosine, True if cosine > 0 else False]
                m_partner[m] = [w, cosine, True if cosine > 0 else False]
            else:
                # Woman is already engaged, check preference
                m1 = w_partner[w][0]
                if not wPrefersM1OverM(women_preference, w, m, m1):
                    w_partner[w] = [m, cosine, True if cosine > 0 else False]
                    m_partner[m] = [w, cosine, True if cosine > 0 else False]
                    m_partner[m1] = None
                    free_men.add(m1)

    return m_partner, w_partner

    # if __name__ == "__main__":
    #     men_preference1 = {
    #         "a": ["f", "h", "g", "e"],
    #         "b": ["g", "e", "h", "f"],
    #         "c": ["h", "e", "f", "g"],
    #         "d": ["e", "f", "g", "h"],
    #         "e": ["h", "f", "g", "e"]
    #     }

    #     women_preference1 = {
    #         "e": ["b", "a", "c", "d", "e"],
    #         "f": ["c", "b", "d", "e", "a"],
    #         "g": ["a", "e", "b", "c", "d"],
    #         "h": ["d", "e", "a", "b", "c"]
    #     }

    #     men_preference2 = {
    #         "A": ["H", "G", "F", "E"],
    #         "B": ["F", "E", "G", "H"],
    #         "C": ["E", "F", "G", "H"],
    #         "D": ["E", "F", "G", "H"]
    #     }

    #     women_preference2 = {
    #         "E": ["A", "B", "C", "D"],
    #         "F": ["A", "B", "C", "D"],
    #         "G": ["A", "B", "C", "D"],
    #         "H": ["A", "B", "C", "D"]
    #     }

    #     mPartner, wPartner = gale_shapley(men_preference1, women_preference1)
    #     print(mPartner)
    #     print(wPartner)

    #     print("Final Stable Matches:")
    #     for man, woman in mPartner.items():
    #         print(f"{man} ⟶ {woman if woman else 'Unmatched'}")
