"use client";

import React, { useState, useEffect } from "react";
import { generatePerformanceAnalysis } from "@/utils/generatePerformanceAnalysis-helpers";
import Link from "next/link";

const QuizView = (
    { questions, sessionId, userId, username }: { questions: any[], sessionId: string, userId: any, username: any}
) => {
    const [showSummary, setShowSummary] = useState(false);
    const [persistIncorrectOptions, setPersistIncorrectOptions] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOptionChecked, setIsOptionChecked] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [answeredQuestions, setAnsweredQuestions] = useState<
        {
            realWorldConnection: string;
            scenario: string;
            options: any;
            confidenceLevel: string;
            correctAnswer: any; question: string; selectedOption: string; selected: string; correct: boolean
        }[]
    >([]);
    const [showHint, setShowHint] = useState(false);
    const [confidenceLevel, setConfidenceLevel] = useState<string>(""); // Tracks confidence level for the current question
    const [evaluations, setEvaluations] = useState<any[]>([]);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    // The code below is intended to store and retrieve states from Local Storage so the user can continue the quiz even after browser refresh.

    // BLOCK START
    // Save state to Local Storage
    useEffect(() => {
        const stateToPersist = {
            currentQuestionIndex,
            answeredQuestions,
        };
        localStorage.setItem("quizState", JSON.stringify(stateToPersist));
    }, [currentQuestionIndex, answeredQuestions]);

    // Retrieve state from Local Storage on mount
    useEffect(() => {
        const savedState = localStorage.getItem("quizState");
        if (savedState) {
            const { currentQuestionIndex, answeredQuestions } = JSON.parse(savedState);
            setCurrentQuestionIndex(currentQuestionIndex || 0);
            setAnsweredQuestions(answeredQuestions || []);
        }
    }, []);
    // BLOCK END

    const generateMarkdownSummary = async () => {
        const markdownSummary = `
        ### **Quiz Overview**
        This summary provides detailed insights into the questions answered during the session.
        
        ---
        
        ${answeredQuestions
                .map((answered, index) => {
                    const optionsExplanation = answered.options
                        .map(
                            (option: any) =>
                                `* **Option ${option.id}:** ${option.text}  
            *Explanation:* ${option.explanation || "No explanation provided"}`
                        )
                        .join("\n");

                    return `### **Question ${index + 1}**  
        **Question Text:** ${answered.question}  
        **Scenario:** ${answered.scenario || "No scenario available"}  
        
        **My Answer:** ${answered.selectedOption || "No answer selected"}  
        **Correct Answer:** ${answered.correctAnswer}  
        
        **My Confidence Level:** ${answered.confidenceLevel || "Not provided"}  
        
        #### **Options Explanation**
        ${optionsExplanation}  
        
        #### **Feedback:**  
        ${answered.correct ? "✅ Correct" : "❌ Incorrect"}  
        
        **Real-World Connection:**  
        ${answered.realWorldConnection || "No real-world connection available"}  
        
        ---`;
                })
                .join("\n")}
        `;

        return markdownSummary;
    };

    // const addAnsweredQuestionsToFirestore




    const handleQuizCompletion = async () => {
        localStorage.removeItem("quizState");
        setShowSummary(true);

        console.log("Analyzing your performance. Please wait...");

        try {
            // Call the function to get the markdown summary
            const markdownSummary = await generateMarkdownSummary();

            // Generate performance analysis and get evaluations
            // Pass answeredQuestions to the analysis function
            const evaluations = await generatePerformanceAnalysis(
                markdownSummary,
                userId,
                answeredQuestions,
                sessionId
            );

            // Store evaluations in the state for rendering
            setEvaluations(evaluations);

            console.log("Evaluations generated successfully:", evaluations);
        } catch (error) {
            console.error("Error during performance analysis:", error);
        }
    };



    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsOptionChecked(false);
            setShowHint(false);
        }
    };

    const selectedAnswerText = (answeredQuestion: any) => {
        if (!answeredQuestion || !answeredQuestion.options) {
            return "Option not found";
        }

        const selectedOptionObject = answeredQuestion.options.find(
            (option: any) => option.id === answeredQuestion.selectedOption
        );

        return selectedOptionObject ? selectedOptionObject.text : "Option not found";
    };

    // console.table(answeredQuestions);

    const handleSelectAnswer = (optionId: string) => {
        setSelectedOption(selectedOption === optionId ? null : optionId);
        setIsOptionChecked(false);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;

        const correct = selectedOption === currentQuestion.correctAnswer;
        setIsOptionChecked(true);
        setFeedback(correct ? "Correct" : "Incorrect.");
        setAnsweredQuestions((prev) => [
            ...prev,
            {
                ...currentQuestion, // Spread all question properties
                question: currentQuestion.question, // Explicitly add question text
                selectedOption, // Track the selected option
                correct, // Whether the answer is correct
                confidenceLevel, // Add the confidence level
            },
        ]);

        // Reset confidence level for the next question
        setConfidenceLevel("");
    };


    // console.log('Questions:', questions);
    console.log('AnsweredQuestions:', answeredQuestions);

    return (
        <div className="max-w-3xl mx-auto p-2 md:p-6 bg-white rounded-lg shadow-md text-gray-800">
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                {currentQuestion.scenario && (
                    <p className="mb-2 italic text-gray-700">{currentQuestion.scenario}</p>
                )}
            </div>
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
            <div className="space-y-2">
                {currentQuestion.options.map((option: any) => {
                    const isPersistedIncorrect = persistIncorrectOptions.includes(option.id);

                    return (
                        <div key={option.id}>
                            <button
                                onClick={() => handleSelectAnswer(option.id)}
                                disabled={
                                    isOptionChecked &&
                                    (isCorrect || isPersistedIncorrect)
                                }
                                className={`flex flex-col gap-3 w-full text-left px-4 py-2 border-y border-x rounded-s ${isOptionChecked && selectedOption === option.id
                                    ? isCorrect
                                        ? "bg-green-50 border-green-300"
                                        : "bg-red-50 border-red-300"
                                    : isPersistedIncorrect
                                        ? "bg-red-50 border-red-300"
                                        : "border-gray-100 hover:bg-gray-50"
                                    }`}
                            >
                                <span
                                    className={`uppercase text-sm ${isOptionChecked && selectedOption === option.id
                                        ? isCorrect
                                            ? "text-green-800"
                                            : "text-red-800"
                                        : ""
                                        }`}
                                >
                                    {isOptionChecked && selectedOption === option.id && feedback}
                                </span>
                                <div className="flex gap-3">
                                    <div
                                        className={`uppercase flex justify-center items-center p-2 border border-gray-300 rounded-full h-6 w-6 ${selectedOption === option.id && "bg-black text-white"
                                            }`}
                                    >
                                        <span>{option.id}</span>
                                    </div>
                                    <span>{option.text}</span>
                                </div>
                            </button>
                            {isOptionChecked &&
                                (isCorrect || isPersistedIncorrect || selectedOption === option.id) && (
                                    <div className="text-black text-sm border-x border-b border-gray-300 ml-3 rounded-b bg-gray-50 p-2">
                                        <p>{option.explanation}</p>
                                    </div>
                                )}
                        </div>
                    );
                })}
            </div>

            {selectedOption &&
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        How confident are you in your answer?
                    </label>
                    <div className="flex space-x-4">
                        {["Low", "Medium", "High"].map((level) => (
                            <button
                                key={level}
                                disabled={isOptionChecked && isCorrect} // Disable only after "Check Answer" is clicked and the answer is correct
                                onClick={() => setConfidenceLevel(level)}
                                className={`px-4 rounded border ${confidenceLevel === level
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700"
                                    } hover:bg-blue-100`}
                            >
                                {level}
                            </button>
                        ))}

                    </div>
                </div>
            }



            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedOption || isOptionChecked || !confidenceLevel}
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                >
                    Check Answer
                </button>
                {currentQuestionIndex < questions.length - 1 ?
                    <button
                        onClick={handleNextQuestion}
                        disabled={!isOptionChecked || !isCorrect}
                        className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                    >
                        Next
                    </button>
                    :
                    <button
                        onClick={handleQuizCompletion}
                        disabled={!isOptionChecked || !isCorrect}
                        className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                    >
                        Show Summary
                    </button>

                }
            </div>
            {showSummary && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-4 mx-2 shadow-2xl shadow-gray-500 max-w-2xl w-full h-[90vh] overflow-auto">
                        <h2 className="text-xl font-bold pb-2 border-b-8 border-gray-600">Session Analysis</h2>
                        <div className="space-y-4 my-8">
                            {evaluations.length > 0 ? (
                                evaluations.map((evaluation, index) => (
                                    <div key={index} className="border-b pb-4 mb-4">
                                        {/* <p className="font-semibold">Analysis:</p> */}
                                        <p className="text-gray-700">{evaluation.analysisText}</p>
                                        <p className="font-semibold mt-4">Quick Note:</p>
                                        <p className="text-gray-700">{evaluation.quickNote}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No evaluations available.</p> // Make this cool and intuitive
                            )}
                        </div>

                        <div className="flex flex-col-reverse md:flex-row gap-4">

                            <Link
                            target="_blank"
                                href={` /${username}`
                                } // Get the username from the parameters
                                className="px-4 py-2 rounded border border-gray-100 md:w-[30vw] text-left"
                            >
                                <span className="font-semibold">

                                    Quit
                                </span>
                                <p className="text-gray-700 text-sm">Go to your dashboard</p>
                            </Link>
                            <button
                                // onClick={handleTryAgain} This function will first generate a lesson note from the 
                                className="px-4 py-2 rounded md:w-[30vw] text-left border border-gray-100 shadow-lg bg-blue-500 text-white"
                            >
                                <span className="font-semibold">

                                    Continue Session
                                </span>
                                <p className="text-sm">
                                     Towards high level understanding
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default QuizView;