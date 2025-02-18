import React from "react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import GeneralCleaning from "@/assets/images/General-Cleaning.png";
import Laundry from "@/assets/images/laundry.jpg";
import CarWash from "@/assets/images/car-wash.jpg";
import WindowCleaning from "@/assets/images/window-cleanning.jpg";
import CarpetCleaning from "@/assets/images/carpet-cleaner.jpg";
import BathroomCleaning from "@/assets/images/bathroom-cleaning.jpg";
import { MoveRight } from "lucide-react";

export default function ServicesCase() {
  const items = [
    {
      Img: GeneralCleaning,
      Name: "General Cleaning",
    },
    {
      Img: Laundry,
      Name: "Laundry Services",
    },
    {
      Img: CarWash,
      Name: "Car-Wash Services",
    },
    {
      Img: WindowCleaning,
      Name: "Window Cleaning",
    },
    {
      Img: CarpetCleaning,
      Name: "Carpet Cleaning",
    },
    {
      Img: BathroomCleaning,
      Name: "Bathroom Cleaning",
    },
  ];
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000);
  }, [api, current]);

  return (
    <div className="w-full p-5 sm:py-10 lg:py-10">
      <div className="mx-1 sm:mx-auto">
        <div className="flex flex-col  gap-10">
          <div className="flex flex-row  justify-between items-center w-screem">
            <h2 className="text-xl md:text-3xl tracking-tighter lg:max-w-xl font-regular text-left">
              Professional Services at Your Doorstep
            </h2>
            <Link
              to="/services"
              className="flex items-center hover:underline gap-4"
            >
              View Services <MoveRight className="w-4 h-4" />
            </Link>
          </div>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem className="basis-1/2 lg:basis-1/4" key={index}>
                  <div className="flex bg-background rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={item.Img}
                      alt={item.Name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                      style={{ aspectRatio: "300/300", objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="text-base text-nowrap overflow-hidden text-ellipsis font-semibold mb-2">
                    {item.Name}
                  </h3>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
