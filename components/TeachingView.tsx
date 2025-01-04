import React from "react";
import { TeachingSection } from "@/app/models/classSessionModel";

interface TeachingViewProps {
    section: TeachingSection;
    onNext: () => void;
    onPrev: () => void; // Callback to move to the previous section
    totalSections: number;
    currentTeachingIndex: number;
}




const TeachingView: React.FC<TeachingViewProps> = ({
    // section,
    onNext,
    onPrev,
    currentTeachingIndex,
    totalSections
}) => {
    const section = {
            "title": "Introduction to the Scientific Method",
            "content": "A highly engaging and immersive explanation of the topic in 150–250 words, integrating storytelling, analogies, real-world examples, or thought-provoking questions to captivate the learner and deepen their understanding.",
            "keyTakeaways": [
                "Summarize key points as bullet points.",
                "Focus on critical concepts learners should remember.",
                "Aim for 2-5 takeaways per topic.",
            ],
        }
    
    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* <div className="mb-4 text-gray-600">
                Section {currentTeachingIndex + 1} of {totalSections}
            </div> */}
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p className="mb-6">{section.content}</p>
            <div className="bg-gray-100 p-4 rounded-md shadow-inner">
                <h3 className="font-semibold mb-2">Key Takeaways</h3>
                <ul className="list-disc ml-6">
                    {section.keyTakeaways.map((takeaway, index) => (
                        <li key={index}>{takeaway}</li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between mt-6">
                <button
                    onClick={onPrev}
                    disabled={currentTeachingIndex === 0}
                    className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    disabled={currentTeachingIndex === totalSections - 1}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TeachingView;
