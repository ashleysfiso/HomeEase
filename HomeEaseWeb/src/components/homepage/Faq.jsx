import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faq = [
    {
      question: "What is HomeEase?",
      answer:
        "HomeEase is your one-stop platform for finding and booking reliable home services like cleaning, maintenance, and more.",
    },
    {
      question: "How does HomeEase work?",
      answer:
        "Simply browse our list of services, select what you need, and book a professional service provider in just a few clicks.",
    },
    {
      question: "Who provides the services on HomeEase?",
      answer:
        "Our service providers are verified professionals who specialize in various home services, ensuring you get quality and reliability every time.",
    },
    {
      question: "What areas does HomeEase cover?",
      answer:
        "HomeEase currently operates in Secunda. We are expanding to more areas soon!",
    },
    {
      question: "How do I contact support?",
      answer:
        "If you have any questions or need assistance, feel free to reach out to our support team at [support email/phone].",
    },
  ];
  return (
    <div className="w-full p-5 rounded-lg sm:pb-10 lg:pb-10">
      <div className="sm:mx-auto">
        <div className="flex p-8 flex-col gap-10">
          <div className="flex text-center justify-center items-center gap-4 flex-col">
            <div className="flex gap-2 flex-col">
              <h1 className="text-4xl md:text-5xl text-[#0a2242] font-bold text-center mb-8">
                Frequently Asked Questions
              </h1>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto px-4">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={"index-" + index}>
                  <div className="rounded-lg">
                    <div className="flex-col items-center justify-between w-full">
                      <AccordionTrigger className="hover:no-underline px-6 py-4 text-lg font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 ">
                        {item.answer}
                      </AccordionContent>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
