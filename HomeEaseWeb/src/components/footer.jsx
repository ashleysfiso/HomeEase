import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600"></div>
        <div className="flex justify-center">
          <Link to="/">
            <h5 className="text-3xl p-4 font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              HomeEase
            </h5>
          </Link>
        </div>
        <p className="mx-auto mt-3 max-w-md text-center leading-relaxed text-gray-500">
          Making home services effortless and reliable. Your comfort, our
          priority.
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              to="/"
            >
              {" "}
              Home{" "}
            </Link>
          </li>

          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              to="/about"
            >
              {" "}
              About{" "}
            </Link>
          </li>

          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              to="/contact"
            >
              {" "}
              Contact{" "}
            </Link>
          </li>

          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              to="/services"
            >
              {" "}
              Services{" "}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
