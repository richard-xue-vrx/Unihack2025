from matcher import Matcher

def main():
    matcher = Matcher()
    matcher.generate_matches()
    
    print("Matches generated:")
    for match in matcher.matches:
        email1, email2, is_lover, score = match
        print(f"{email1} ⟶ {email2} | Is Lover: {is_lover} | Score: {score}")

if __name__ == "__main__":
    main()