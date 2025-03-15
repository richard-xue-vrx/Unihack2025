const categories = ["personality", "morals", "interests_hobbies", "life_goals", "love_languages", "lifestyle", "dealbreakers"]

interface Survey {
  // this is how we navigate the flow and order of all the questions
  category: [
    {

    }
  ]
}

interface Question {
  category_name: string,
  is_self_question: boolean,
  question: string
}

export interface Ranked extends Question {
  answers: string[],
}

export interface Scale extends Question {
  // We assume that the answers are always 1 to 5
}

export interface Binary extends Question {
  // We assume the answers are either 1 or 0 for Yes or No
  answers: string[],
}

const exampleRankedQuestion: Ranked = {
  category_name : "INTERESTS AND HOBBIES",
  is_self_question : true,
  question: "On your free day you're most likely to?",
  answers: [
    "📺 Binge-watch a new show",
    "🏋️‍♂️ Hit the gym or go for a hike",
    "📖 Read a book or listen to a podcast",
    "🚀 Go out and explore the city"
  ]
}
