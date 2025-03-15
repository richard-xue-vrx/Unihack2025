type Category =   "personality" | "morals" | "interests_hobbies" | "life_goals" | "love_languages" | "lifestyle" | "dealbreakers"

interface Survey {
  sections: Section[]
}

interface Section {
 category: Category
 questions: Question[]
}

interface Question {
  category_name: Category,
  type: "RANKED" | "SCALE" | "BINARY"
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
  category_name: "interests_hobbies",
  type: "RANKED",
  is_self_question: true,
  question: "On your free day you're most likely to?",
  answers: [
    "📺 Binge-watch a new show",
    "🏋️‍♂️ Hit the gym or go for a hike",
    "📖 Read a book or listen to a podcast",
    "🚀 Go out and explore the city"
  ]
}

const exampleRankedQuestion2: Ranked = {
  category_name: "interests_hobbies",
  type: "RANKED",
  is_self_question: true,
  question: "Which of these describes your dream vacation?",
  answers: [
    "🏝 Chilling on a beach",
    "🏰 Exploring historical sites",
    "🏔 Going on an outdoor adventure",
    "🏙 Partying in a big city"
  ]
}

const exampleBinaryQuestion: Binary = {
  category_name: "personality",
  type: "BINARY",
  is_self_question: true,
  question: "Which sounds more fun?",
  answers: [
    "A last minute road trip",
    "A cozy night at home"
  ]
}
const exampleBinaryQuestion2: Binary = {
  category_name: "personality",
  type: "BINARY",
  is_self_question: true,
  question: "What do you do at a party?",
  answers: [
    "Jump into a conversations with everyone!",
    "Stick with people I know"
  ]
}

export const survey: Survey = {
  sections: [
    {
      category: "interests_hobbies",
      questions: [
        exampleRankedQuestion,
        exampleRankedQuestion2
      ]
    },
    {
      category: "personality",
      questions: [
        exampleBinaryQuestion,
        exampleBinaryQuestion2
      ]
    },
  ]
}
