// /models/quizModel.ts
export interface Option {
    id: string;
    text: string;
    explanation: string; // Detailed explanation for feedback
}

export interface Question {
    id: string; // Unique ID for tracking
    question: string; // The main question text
    scenario?: string; // Optional scenario to set context
    options: Option[]; // Multiple-choice options
    correctAnswer: string; // ID of the correct option
    // 
    hint: string; // A subtle hint for users needing help
    // feedback: { // Tailored feedback based on performance
    //     correct: string; // Feedback if the answer is correct
    //     incorrect: string; // Feedback if the answer is incorrect
    // };
    category: "Application" | "Critical Thinking"; // Depth of thinking required
    realWorldConnection?: string; // Explanation of real-world relevance
}

// Example Questions
export const questions: Question[] = [
    {
        id: "q1",
        question: "A spacecraft is set to land on Mars. Before landing, its heat shield must deploy. What could happen if the shield fails?",
        scenario: "You're part of a space mission design team tasked with addressing high-speed atmospheric entry challenges.",
        options: [
            { id: "a", text: "The spacecraft will slow down safely.", explanation: "Without a heat shield, the spacecraft will burn due to friction with the atmosphere." },
            { id: "b", text: "The spacecraft will burn up in the atmosphere.", explanation: "The heat shield protects the spacecraft from the intense heat of reentry." },
            { id: "c", text: "The spacecraft will bounce off the atmosphere.", explanation: "Atmospheric bounce is not a likely outcome for a shield failure." },
            { id: "d", text: "The spacecraft will lose radio communication.", explanation: "While radio blackouts can occur, this is unrelated to heat shield failure." },
        ],
        correctAnswer: "b",
        hint: "Think about the purpose of a heat shield during atmospheric entry.",
        // feedback: {
        //     correct: "Great job! The heat shield is critical for safe reentry and landing.",
        //     incorrect: "Not quite. Without the heat shield, the spacecraft cannot survive the atmospheric friction and heat.",
        // },
        category: "Application",
        realWorldConnection: "Heat shields are essential for spacecraft safety during planetary exploration missions."
    },
    {
        id: "q2",
        question: "Why are some telescopes placed in space rather than on Earth?",
        scenario: "You're advising on the next-generation telescope design and its placement.",
        options: [
            { id: "a", text: "Space telescopes are easier to repair.", explanation: "Repairs in space are difficult and rare." },
            { id: "b", text: "To avoid atmospheric distortion.", explanation: "Earth’s atmosphere distorts and blocks some wavelengths of light." },
            { id: "c", text: "They collect more light in space.", explanation: "Light collection depends on mirror size, not location." },
            { id: "d", text: "They are closer to the stars.", explanation: "Stars are so distant that proximity does not matter significantly." },
        ],
        correctAnswer: "b",
        hint: "Consider how Earth's atmosphere affects light from stars.",
        // feedback: {
        //     correct: "Excellent! Placing telescopes in space eliminates the interference of Earth's atmosphere.",
        //     incorrect: "Not quite. The main reason for space telescopes is to avoid the distortion caused by Earth's atmosphere.",
        // },
        category: "Critical Thinking",
        realWorldConnection: "The Hubble Space Telescope and James Webb Space Telescope provide clear views of the universe from space."
    },
    {
        id: "q3",
        question: "What could be the consequence of deflecting an asteroid too far from its original path?",
        scenario: "You're working on planetary defense strategies for asteroid impact prevention.",
        options: [
            { id: "a", text: "The asteroid might miss Earth but hit another planet.", explanation: "Over-deflection could redirect the asteroid elsewhere in the solar system." },
            { id: "b", text: "The asteroid might break into smaller pieces.", explanation: "Fragmentation depends on deflection methods, not just over-deflection." },
            { id: "c", text: "The asteroid will return to its original path.", explanation: "Once deflected, the asteroid will not naturally return to its prior orbit." },
            { id: "d", text: "The asteroid’s velocity will decrease significantly.", explanation: "Velocity is influenced by the method of deflection, not its degree." },
        ],
        correctAnswer: "a",
        hint: "Think about the potential unintended consequences of over-deflection.",
        // feedback: {
        //     correct: "Good reasoning! Planetary defense needs to consider the aftermath of asteroid redirection.",
        //     incorrect: "Not quite. The goal of asteroid deflection is to minimize impact risks, but over-deflection introduces new challenges.",
        // },
        category: "Critical Thinking",
        realWorldConnection: "Asteroid redirection missions like NASA's DART aim to test deflection methods for planetary defense."
    },
    {
        id: "q4",
        question: "Why does the Moon appear larger when it's near the horizon?",
        scenario: "You're preparing for a public talk about common misconceptions in astronomy.",
        options: [
            { id: "a", text: "It’s physically closer to Earth at the horizon.", explanation: "The Moon's distance from Earth remains nearly constant." },
            { id: "b", text: "Atmospheric refraction magnifies the Moon.", explanation: "Refraction slightly shifts the Moon’s position, not its size." },
            { id: "c", text: "It’s an optical illusion.", explanation: "The Moon illusion makes it appear larger near the horizon." },
            { id: "d", text: "The Earth's rotation changes our perspective.", explanation: "Perspective from rotation does not affect the Moon’s apparent size." },
        ],
        correctAnswer: "c",
        hint: "Consider how your brain perceives objects on the horizon.",
        // feedback: {
        //     correct: "Exactly! The Moon illusion is a fascinating example of how our brains interpret size and distance.",
        //     incorrect: "Not quite. The apparent size difference is due to an optical illusion, not physical factors.",
        // },
        category: "Application",
        realWorldConnection: "Understanding the Moon illusion helps debunk common myths in astronomy."
    }
];
