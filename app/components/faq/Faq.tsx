"use client";

import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";

type FaqType = {
  question: string;
  answer: string;
};
const Faq = () => {
  const [faqs, setFaqs] = useState<FaqType[]>([]);

  const addToFaqHandler = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const deleteFaqHandler = (index: number) => {
    console.log("index", index);
    setFaqs((prevFaqs) => {
      const updatedFaqs = prevFaqs.filter((faq, i) => i !== index);

      return updatedFaqs;
    });
  };
  const handleQuestionTitleChange = (e: any, index: number) => {
    const newFaqs = [...faqs];
    newFaqs[index].question = e.target.value;
    setFaqs(newFaqs);
  };
  const handleAnswerTitleChange = (e: any, index: number) => {
    const newFaqs = [...faqs];
    newFaqs[index].answer = e.target.value;
    setFaqs(newFaqs);
  };

  return (
    <div>
      <div className="w-full px-6 py-6 mt-8 border border-dashed border-gray-500 rounded-md">
        <p className="font-semibold ">Add FAQ section to your event page</p>
        <p className="text-lightText mt-3 mb-5 ">
          Make your event stand out even more. These sections help attendees
          find information and answer their questions -which means more ticket
          sales and less time answering messages.
        </p>

        <div className="mb-10 w-full">
          {faqs.map((item, i) => (
            <div key={i} className="flex mb-10 gap-6 w-full">
              <div className="flex-1">
                <div className="w-full flex-1">
                  <label
                    className="text-sm text-gray-800"
                    htmlFor="questionTitle"
                  >
                    Question title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={item.question}
                    onChange={(e) => handleQuestionTitleChange(e, i)}
                    id="questionTitle"
                    type="text"
                    className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                  />
                </div>
                <div className="w-full mt-4">
                  <label
                    className="text-sm text-gray-800"
                    htmlFor="questionAnswer"
                  >
                    Question answer <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={item.answer}
                    onChange={(e) => handleAnswerTitleChange(e, i)}
                    id="questionAnswer"
                    type="text"
                    className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                  />
                </div>
              </div>
              <div className="min-h-full w-[1px] bg-[#D3D0D6]" />
              <div
                onClick={() => deleteFaqHandler(i)}
                className="min-h-full flex items-center justify-center hover:bg-opacity-70 cursor-pointer w-9 rounded-md bg-[#FCEDED] text-2xl text-[#CC0000]"
              >
                <RiDeleteBin6Fill />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addToFaqHandler}
          className="bg-lightPurple text-sm flex justify-center items-center space-x-1 text-primaryPurple h-10 w-full"
        >
          <GoPlus /> <p>Add Question</p>
        </button>
      </div>
    </div>
  );
};

export default Faq;
