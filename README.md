#### Backend

Our Backend stack is built on a Python Flask Framework.

Ensure you run the backend with flask!

```cd be && flask run ```



#### Frontend
Recommend using `pnpm` if you aren't already or `npm`.

Don't forget to `pnpm i` in the frontend folder.<br>
To run the frontend run `pnpm dev`.

#### Matching Algorithm

Internally, we represent all survey participants as a pair of two vectors, one representing their personal information and values, and the other their desired values they would like to see in a partner.
We find the Cosine Similarity for all potential pairings, respecting factors like age, preference etc, to create a list of preferred partners for each person. Then, with the Gale-Shapely algorithm, we match partners
to produce the best possible mathematical match.

Given the ability to produce a numerical matching, we split all pairings into either "friend" or "partner" matches, depending on the projected level of compatibility between paired subjects. 
