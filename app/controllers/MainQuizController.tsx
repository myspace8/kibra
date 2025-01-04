"use client"

import React, { useState } from "react";
import QuizView from "@/components/MainQuizView";

const QuizController: React.FC = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOptionChecked, setisOptionChecked] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [answeredQuestions, setAnsweredQuestions] = useState<
        { question: string; selected: string; correct: boolean }[]
    >([]);
    const [showHint, setShowHint] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleSelectAnswer = (optionId: string) => {
        setSelectedOption(selectedOption === optionId ? null : optionId);
        setisOptionChecked(false);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;

        const correct = selectedOption === currentQuestion.correctAnswer;
        setisOptionChecked(true);
        setFeedback(correct ? "Correct" : "Incorrect.");
        setAnsweredQuestions((prev) => [
            ...prev,
            {
                question: currentQuestion.question,
                selected: selectedOption || "",
                correct,
            },
        ]);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setisOptionChecked(false);
            setShowHint(false)
        } else {
        }
    };

    return (
        <div>
            <QuizView
                question={currentQuestion}
                feedback={feedback}
                answeredQuestions={answeredQuestions}
                selectedOption={selectedOption}
                onOptionChange={handleSelectAnswer}
                onCheckOption={handleCheckAnswer}
                isOptionChecked={isOptionChecked}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onNextQuestion={handleNextQuestion}
                onPrevQuestion={() =>
                    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
                }
            />
        </div>
    );
};

export default QuizController;