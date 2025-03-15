export type Category =   "personality" | "morals" | "interests_hobbies" | "life_goals" | "love_languages" | "lifestyle" | "politics"

interface Survey {
  sections: Section[]
}

interface Section {
 category: Category
 questions: Question[]
}

export interface Question {
  category_name: Category,
  type: "RANKED" | "SCALE" | "BINARY"
  is_self_question: boolean,
  is_similar_question: boolean,
  question: string
}

export interface Ranked extends Question {
  answers: string[],
}

export interface Scale extends Question {
  // We assume that the answers are always 1 to 5
  answers: string[],
}

export interface Binary extends Question {
  // We assume the answers are either 1 or 0 for Yes or No
  answers: string[],
}

const exampleRankedQuestion: Ranked = {
  category_name: "interests_hobbies",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
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
  is_similar_question: true,
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
  is_similar_question: true,
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
  is_similar_question: true,
  question: "What do you do at a party?",
  answers: [
    "Jump into a conversations with everyone!",
    "Stick with people I know"
  ]
}

const lifestyleQuestion1: Binary = {
  category_name: "lifestyle",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "Which of these are you?",
  answers: [
    "🌞 Early bird",
    "🌙 Night owl"
  ]
}

const lifestyleQuestion2: Binary = {
  category_name: "lifestyle",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "How clean do you keep your space?",
  answers: [
    "✨ Spotless",
    "🌀 Organised chaos"
  ]
}

const lifestyleQuestion3: Ranked = {
  category_name: "lifestyle",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "On the weekend you're more likely to?",
  answers: [
    "😴 Sleeping in & doing nothing",
    "✅ Being productive & crossing off tasks",
    "🎭 Going out & having fun",
    "🎲 Random spontaneous plans"
  ]
}

const lifestyleQuestion4: Ranked = {
  category_name: "lifestyle",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "On the weekend you're more likely to?",
  answers: [
    "🍽️ Dinner at a cozy restaurant",
    "🎳 A fun activity (e.g., mini-golf, bowling)",
    "☕ Coffee at a cute café",
    "🌳 A scenic walk in the park"
  ]
}

const lifestyleQuestion5: Scale = {
  category_name: "lifestyle",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "On a scale of 1 to 5, how often do you exercise?",
  answers: [
    "🛋️ Never",
    "🏋️‍♀ Daily, without fail!"
  ]
}

const lifestyleQuestion6: Scale = {
  category_name: "lifestyle",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "On a scale of 1 to 5, how much do you love traveling?",
  answers: [
    "🏠 I prefer staying home",
    "✈ I’m always planning my next trip"
  ]
}

const politicsQuestion1: Scale = {
  category_name: "politics",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "I think wealth should be shared equally like giant pizza slices - no one should get all yummy bits while others are left with just the crust",
  answers: [
    "Strongly Disagree",
    "Strongly Agree"
  ]
}

const politicsQuestion2: Scale = {
  category_name: "politics",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "I think the free economy will always correct itself without any government help - its like magic!",
  answers: [
    "Strongly Disagree",
    "Strongly Agree"
  ]
}

const politicsQuestion3: Scale = {
  category_name: "politics",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "In think in turbulent times, a decisive government that may restrict some personal freedoms is necessary to keep society on track",
  answers: [
    "Strongly Disagree",
    "Strongly Agree"
  ]
}

const politicsQuestion4: Scale = {
  category_name: "politics",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "I think preserving individual freedom and free speech is more important - even if that means quite a bit of societal chaos",
  answers: [
    "Strongly Disagree",
    "Strongly Agree"
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
    {
      category: "lifestyle",
      questions: [
        lifestyleQuestion1,
        lifestyleQuestion2,
        lifestyleQuestion3,
        lifestyleQuestion4,
        lifestyleQuestion5,
        lifestyleQuestion6
      ]
    },
    {
      category: "politics",
      questions: [
        politicsQuestion1,
        politicsQuestion2,
        politicsQuestion3,
        politicsQuestion4
      ]
    },
  ]
}
