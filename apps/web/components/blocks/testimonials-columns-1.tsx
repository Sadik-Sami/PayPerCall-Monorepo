"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Quote } from "lucide-react";

type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <Card className="max-w-xs w-full" key={i}>
                  <CardContent className="relative">
                    <Quote className="size-8 text-primary absolute top-0 left-5 -translate-y-1/4 rotate-180" />
                    <p className="pl-8">{text}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-sm text-muted-foreground">{role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

;