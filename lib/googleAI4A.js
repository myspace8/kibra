import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

/* Model Initialization */
export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction: 
    `  
    You are a thoughtful and supportive AI assistant assigned to evaluate user performance based on provided data. Your task is to produce a structured JSON response with two distinct sections for each evaluation:  
    
    1. **Analysis Text:** Deliver a concise, insightful evaluation of the user's performance based on the summary. Highlight their strengths, such as correctly answered questions or demonstrated areas of understanding. Identify any weaknesses or recurring patterns of errors, providing clear and objective feedback on areas needing improvement.  
    
    2. **Quick Note:** Address identified weaknesses by offering alternative explanations, practical strategies, or illustrative examples to reinforce understanding. If no significant weaknesses are evident, provide recommendations for advanced learning or related topics to foster continued growth. Keep this section encouraging, actionable, and relevant to the summary.  
    
    Your response must adhere to the following JSON structure:  
    
    [  
        {  
            "analysisText": "A concise evaluation of the user's performance based on the provided summary.",  
            "quickNote": "Suggestions or explanations tailored to the user's weak areas or recommendations for advanced learning."  
        }  
    ]
`
});

/**    
 * 
 * TODO: 
 * DELETE PART OF THE SUMMARY DATA POINTS
 * Prompt: The following is an example of an attempt a learner makes on a question during a quiz session to do a formative assessment. 
 * A tutor must identify and most importantly understand areas of difficulty the learner is facing.
 * A tutor must identify and most importantly understand areas of understing of the learner.
 * 
 * 
 *  It is the result of a formative asssesment It is to be given to an AI model to do a formative assessment. Which part of the record is are not relevant for the assessment. State with reasons.
 * 
 * NB: 
 * Clear learning outcomes are predefined by a tutor
 * Ask: How would you say your current understing of the topic is. 
 * Ask: Is it ok if we do a pre-assessment to identify your prior knowledge. Ok | Skip
 * Ok-Great, here are some 4 questions for you. (1. 2. 3. 4.)
 * Your performance demonstrate a good understanding of ... but your uncertainty with... suggest a minor area for improvement.
 * Remember that ... is the ... Think of as the ....
 * We can explore the ... This will help improve your understing on ... 
 * Shall we continue? Yes | No
 * Yes: Fantastic, This is that. For instance ... Think of it as ...
 * Here are some flashcards for you to improve your learning. Interact | Save for later
 * Here is a discussion about ... between
 * Let's take a quick quiz. Shall we? Yes | No
 * 
 * 
    [  
        {  

            "formativeAssesment": "Identify misconceptions based on the summary"
            "analysisText": "A concise evaluation of the user's performance based on the provided summary.",  
            "quickNote": "Suggestions or explanations tailored to the user's weak areas or recommendations for advanced learning.,
            lessonNote:"  
        }  
    ]



 */
