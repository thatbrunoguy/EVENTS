"use client";

import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";

const faqs = [
  {
    title: "Why should I use email campaigns for my event?",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam perferendis sequi, alias distinctio harum cupiditate enim adipisci eligendi id omnis!",
  },

  {
    title: " What do I even write about?",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam perferendis sequi, alias distinctio harum cupiditate enim adipisci eligendi id omnis!",
  },

  {
    title: "How many emails should I send?",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam perferendis sequi, alias distinctio harum cupiditate enim adipisci eligendi id omnis!",
  },

  {
    title: "How do I make my emails look good?",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam perferendis sequi, alias distinctio harum cupiditate enim adipisci eligendi id omnis!",
  },
  {
    title: "Where can I create my email campaigns?",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam perferendis sequi, alias distinctio harum cupiditate enim adipisci eligendi id omnis!",
  },
];
const Faq = () => {
  return (
    <div>
      <Accordion>
        {faqs.map((faq) => (
          <AccordionItem>
            <AccordionHeader className="w-full ">
              <div className="py-5 w-full border-b flex items-center justify-between">
                <h3 className={`accordion-title`}>{faq.title}</h3>
                <div className="text-xl cursor-pointer hover:text-gray-500">
                  +
                </div>
              </div>
            </AccordionHeader>

            <AccordionBody>
              <div className="py-4">{faq.content}</div>
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
