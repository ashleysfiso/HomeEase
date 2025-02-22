import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({
  title,
  backgroundImage,
  breadcrumbs = [],
}) {
  return (
    <div className="container relative mt-16 h-[300px] border-r-2 max-w-7xl mx-auto">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 text-white">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm md:text-base">
            {breadcrumbs.map((item, index) => (
              <div key={item.href} className="flex items-center">
                {index > 0 && <span className="mx-2">{">"}</span>}
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
