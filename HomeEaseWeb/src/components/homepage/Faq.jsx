import React from "react";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            <Badge variant="outline">FAQ</Badge>
            <div className="flex gap-2 flex-col">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                HomeEase FAQ
              </h4>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                Got questions about how HomeEase works? We've got answers!
              </p>
            </div>
            <div>
              <Link to="/contact">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <MessageSquare className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className=" w-full ">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={"index-" + index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
