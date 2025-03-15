export type Category = "personality" | "morals" | "interests_hobbies" | "life_goals" | "love_languages" | "lifestyle" | "politics"

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
  type: "RANKED"
  answers: string[],
}

export interface Scale extends Question {
  type: "SCALE"
  // We assume that the answers are always 1 to 5
  answers: string[],
}

export interface Binary extends Question {
  // We assume the answers are either 1 or 0 for Yes or No
  type: "BINARY"
  answers: string[],
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
  question: "On a date you're more likely to?",
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

const lifestyleQuestion7: Scale = {
  category_name: "lifestyle",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "How important is it that your partner has a similar lifestyle to you?",
  answers: [
    "Not important",
    "Very important"
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

const politicsQuestion5: Scale = {
  category_name: "politics",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "How important is it that your partner has a similar political view to you?",
  answers: [
    "Not important",
    "Very important"
  ]
}

const interestsQuestion1: Binary = {
  category_name: "interests_hobbies",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "Are you into video games?",
  answers: [
    "🎮 Yes, I love gaming!",
    "🌙 No, not my thing"
  ]
}

const interestsQuestion2: Binary = {
  category_name: "interests_hobbies",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "Do you prefer solo hobbies over group activities?",
  answers: [
    "🎨 Yes, I enjoy hobbies alone.",
    "🤸‍♂️ No, I love group activities!"
  ]
}

const interestsQuestion3: Ranked = {
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

const interestsQuestion4: Ranked = {
  category_name: "interests_hobbies",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "Rank your dream vacation",
  answers: [
    "🏝 Chilling on a beach",
    "🏰 Exploring historical sites",
    "🏔 Going on an outdoor adventure",
    "🏙 Partying in a big city"
  ]
}

const interestsQuestion5: Scale = {
  category_name: "interests_hobbies",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "On a scale of 1 to 5, how much do you love trying new hobbies?",
  answers: [
    "Not at all",
    "I’m always trying something new"
  ]
}

const interestsQuestion6: Scale = {
  category_name: "interests_hobbies",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "How important is it that your partner has similar hobbies and interests to you?",
  answers: [
    "Not important",
    "Very important"
  ]
}

const lifegoalQuestion1: Ranked = {
  category_name: "life_goals",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "Rank your ideal retirement plan",
  answers: [
    "🧑 Living off the land",
    "🏠 Suburban House",
    "☕ Opening your own cafe",
    "🏙️ City Apartment"
  ]
}

const lifegoalQuestion2: Ranked = {
  category_name: "life_goals",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "Rank your future family preferences",
  answers: [
    "👶 Kids are a must",
    "🐶 Fur babies only",
    "🚫 Just us, no kids or pets",
    "🤔 Still figuring it out"
  ]
}

const lifegoalQuestion3: Ranked = {
  category_name: "life_goals",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "Rank in order of how you prioritise your financial goals",
  answers: [
    "🏦 Saving & investing for the future",
    "✈️ Spending on experiences (travel, events)",
    "🤑 Living in the moment, enjoying life",
    "💰 Prioritizing security (buying a home)"
  ]
}

const lifegoalQuestion4: Scale = {
  category_name: "life_goals",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: false,
  question: "How locked in are you?",
  answers: [
    "🎮 I'm geeking",
    "🔒 I'm locked in"
  ]
}

const lifegoalQuestion5: Scale = {
  category_name: "life_goals",
  type: "SCALE",
  is_self_question: false,
  is_similar_question: false,
  question: "How locked in is your ideal partner?",
  answers: [
    "🏝️ Unemployment Island",
    "💼 Future CEO"
  ]
}

const lifegoalQuestion6: Scale = {
  category_name: "life_goals",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "How important is it that your partner has similar life goals to you?",
  answers: [
    "Not important",
    "Very important"
  ]
}

const moralsQuestion1: Binary = {
  category_name: "morals",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "It’s your best friends wedding and you discover their partner is cheating, do you tell them?",
  answers: [
    "✅ Yes",
    "🚫 No"
  ]
}

const moralsQuestion2: Binary = {
  category_name: "morals",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "Do you believe in the death penalty?",
  answers: [
    "🔪 Yes, some crimes deserve it",
    "🚫 No, it’s inhumane"
  ]
}

const moralsQuestion3: Ranked = {
  category_name: "morals",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "You accidentally damage someone’s car in a parking lot but no one sees. Rank your responses from most to least likely:",
  answers: [
    "😬 Drive off and pretend it never happened",
    "📝 Leave a note with your contact details",
    "🗿 Try to pin the accident on another car",
    "⏰ Stay and wait for the owner to come back"
  ]
}

const moralsQuestion4: Ranked = {
  category_name: "morals",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "Your partner has been accused of something serious at work, but they insist they’re innocent. If you defend them publicly and they turn out guilty, your reputation will take a huge hit. What do you do?",
  answers: [
    "🛡️ Defend them no matter what",
    "💬 Support them privately but stay neutral in public",
    "⌛ Wait for more information before doing anything",
    "🚫 Distance yourself just in case"
  ]
}

const moralsQuestion5: Ranked = {
  category_name: "morals",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "A co-worker is unfairly blamed for a mistake that was actually yours. Rank your responses from most to least likely:",
  answers: [
      "🤝 Own up immediately, no hesitation",
      "🛑 Get defensive if the co-worker starts blaming you instead",
      "⚠️ Only confess if they start facing real consequences",
      "🤫 Stay quiet and move on"
  ]
}

const moralsQuestion6: Scale = {
  category_name: "morals",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "How important is it that your partner has a similar moral compass to you?",
  answers: [
    "Not important",
    "Very important"
  ]
}

const personalityQuestion1: Binary = {
  category_name: "personality",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "What sounds more fun?",
  answers: [
    "🚗 A last minute road trip",
    "🛏️ A cozy night at home"
  ]
}

const personalityQuestion2: Binary = {
  category_name: "personality",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: false,
  question: "What do you do at a party?",
  answers: [
    "🗣️ Jump into a conversations with everyone!",
    "👥 Stick with people I know"
  ]
}

const personalityQuestion3: Binary = {
  category_name: "personality",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "How do you typically handle disagreements?",
  answers: [
    "🤝 I prefer to resolve them right away",
    "⌛ I need some time to think about it"
  ]
}

const personalityQuestion4: Binary = {
  category_name: "personality",
  type: "BINARY",
  is_self_question: false,
  is_similar_question: false,
  question: "Would you like your partner to be more introverted or extroverted?",
  answers: [
    "🗣️ Extroverted",
    "👥 Introverted"
  ]
}

const personalityQuestion5: Ranked = {
  category_name: "personality",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: false,
  question: "Rank these personality qualities in the best order that describes you!",
  answers: [
    "💪 Independence",
    "😆 Sense of humour",
    "🤗 Emotional Intelligence",
    "🧠 Intelligence",
    "🎨 Creativity"
  ]
}

const personalityQuestion6: Ranked = {
  category_name: "personality",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: false,
  question: "Rank these personality qualities in order of importance in a partner",
  answers: [
    "💪 Independence",
    "😆 Sense of humour",
    "🤗 Emotional Intelligence",
    "🧠 Intelligence",
    "🎨 Creativity"
  ]
}

const personalityQuestion7: Scale = {
  category_name: "personality",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "How important is it that your partner has a similar personality to you?",
  answers: [
    "Not important",
    "Very important"
  ]
}

const loveLanguageQuestion1: Binary = {
  category_name: "love_languages",
  type: "BINARY",
  is_self_question: true,
  is_similar_question: true,
  question: "Do you prefer texting over calling?",
  answers: [
    "📱 Yes, texting all the way!",
    "📞 No, I prefer calling."
  ]
}

const loveLanguageQuestion2: Ranked = {
  category_name: "love_languages",
  type: "RANKED",
  is_self_question: true,
  is_similar_question: true,
  question: "Rank the following in order of importance to you",
  answers: [
    "🎁 Receiving gifts",
    "👂 Words of affirmation",
    "🤗 Acts of service",
    "🤗 Quality time",
    "🤗 Physical touch"
  ]
}

const loveLanguageQuestion3: Scale = {
  category_name: "love_languages",
  type: "SCALE",
  is_self_question: true,
  is_similar_question: true,
  question: "How important is it that your partner has a similar love language to you?",
  answers: [
    "Not important",
    "Very important"
  ]
}

export const survey: Survey = {
  sections: [
    {
      // UPDATE THESE TO BE REAL QEUSTIONS
      category: "personality",
      questions: [
        lifegoalQuestion1,
        lifegoalQuestion2,
        lifegoalQuestion5,
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
        lifestyleQuestion6,
        lifestyleQuestion7
      ]
    },
    {
      category: "politics",
      questions: [
        politicsQuestion1,
        politicsQuestion2,
        politicsQuestion3,
        politicsQuestion4,
        politicsQuestion5
      ]
    },
    {
      category: "interests_hobbies",
      questions: [
        interestsQuestion1,
        interestsQuestion2,
        interestsQuestion3,
        interestsQuestion4,
        interestsQuestion5,
        interestsQuestion6
      ]
    },
    {
      category: "life_goals",
      questions: [
        lifegoalQuestion1,
        lifegoalQuestion2,
        lifegoalQuestion3,
        lifegoalQuestion4,
        lifegoalQuestion5,
        lifegoalQuestion6
      ]
    },
    {
      category: "morals",
      questions: [
        moralsQuestion1,
        moralsQuestion2,
        moralsQuestion3,
        moralsQuestion4,
        moralsQuestion5,
        moralsQuestion6
      ]
    },
    {
      category: "personality",
      questions: [
        personalityQuestion1,
        personalityQuestion2,
        personalityQuestion3,
        personalityQuestion4,
        personalityQuestion5,
        personalityQuestion6,
        personalityQuestion7
      ]
    },
    {
      category: "love_languages",
      questions: [
        loveLanguageQuestion1,
        loveLanguageQuestion2,
        loveLanguageQuestion3,
      ]
    }
  ]
}
