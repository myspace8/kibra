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
    hint: string; // A subtle hint for users 
    category: "Application" | "Understanding" | "Critical Thinking" | "Knowledge"; // Depth of thinking required
    realWorldConnection?: string; // Explanation of real-world relevance
}

export const questions: Question[] = [
    {
        id: "q1",
        question: "What happens when you touch something very hot?",
        scenario: "Imagine you accidentally touch a hot pan while cooking. Your hand pulls away quickly without you thinking about it.",
        options: [
            { id: "a", text: "Your brain sends a message to pull your hand away.", explanation: "This is incorrect because reflexes are handled by the spinal cord, not the brain." },
            { id: "b", text: "Your spinal cord sends a reflex signal to pull your hand away.", explanation: "Correct! Reflexes are quick actions coordinated by the spinal cord." },
            { id: "c", text: "Your muscles sense the heat and move by themselves.", explanation: "Muscles do not act independently; they require signals from the nervous system." },
            { id: "d", text: "Your sensory nerves move your hand away.", explanation: "Sensory nerves detect the heat but do not directly move your hand; motor nerves handle the movement." },
        ],
        correctAnswer: "b",
        hint: "Reflex actions bypass the brain to save time during emergencies.",
        category: "Application",
        realWorldConnection: "Reflexes are critical for protecting the body from harm in sudden situations."
    },
    {
        id: "q2",
        question: "Which part of the nervous system is responsible for controlling voluntary movements?",
        scenario: "You are trying to kick a ball into a goal during a soccer match. Which part of your nervous system helps you aim and move your leg?",
        options: [
            { id: "a", text: "The spinal cord", explanation: "The spinal cord handles reflexes and transmitting signals but does not control voluntary movement directly." },
            { id: "b", text: "The brain", explanation: "Correct! The brain processes information and coordinates voluntary movements." },
            { id: "c", text: "The sensory nerves", explanation: "Sensory nerves detect information but do not control movement." },
            { id: "d", text: "The autonomic nervous system", explanation: "This system controls involuntary actions, like heartbeat or digestion, not voluntary movement." },
        ],
        correctAnswer: "b",
        hint: "Think about where decisions and coordination of movements originate.",
        category: "Understanding",
        realWorldConnection: "The brain enables athletes to make precise movements during sports activities."
    },
    {
        id: "q3",
        question: "Why is damage to the spinal cord often very serious?",
        scenario: "A person is in an accident and suffers an injury to their spinal cord. Doctors are concerned about potential effects on their mobility and sensation.",
        options: [
            { id: "a", text: "It only affects the brain’s ability to think.", explanation: "The spinal cord does not control thinking; this is the brain's role." },
            { id: "b", text: "It can interrupt communication between the brain and body.", explanation: "Correct! The spinal cord acts as a communication highway, and damage can disrupt these signals." },
            { id: "c", text: "It causes the nervous system to shut down completely.", explanation: "This is not entirely accurate; some functions may still work depending on the injury." },
            { id: "d", text: "It stops sensory nerves from detecting stimuli.", explanation: "While sensory nerves may be affected, this is not the main issue with spinal cord injuries." },
        ],
        correctAnswer: "b",
        hint: "The spinal cord acts as a highway for signals in the nervous system.",
        category: "Critical Thinking",
        realWorldConnection: "Spinal cord injuries often require extensive rehabilitation and technology to restore some lost functions."
    },
    {
        id: "q4",
        question: "What is the role of neurons in the nervous system?",
        scenario: "You’re learning about how the body sends and receives signals. Neurons play a crucial role in this process.",
        options: [
            { id: "a", text: "They protect the brain from injury.", explanation: "This is incorrect. Neurons transmit signals, while other structures protect the brain." },
            { id: "b", text: "They transmit electrical signals in the body.", explanation: "Correct! Neurons are responsible for sending and receiving messages in the nervous system." },
            { id: "c", text: "They provide energy to muscles.", explanation: "Muscles get energy from other sources, not neurons." },
            { id: "d", text: "They store information like a computer's hard drive.", explanation: "While neurons process information, they do not store it in the same way as a computer." },
        ],
        correctAnswer: "b",
        hint: "Neurons are often compared to electrical wires in a system.",
        category: "Knowledge",
        realWorldConnection: "Neurons are essential for activities like thinking, feeling, and moving."
    }
];
