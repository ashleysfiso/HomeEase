import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto bg-muted max-w-screen-xl">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-primary sm:justify-start">
            <Link to="/">
              <h5 className="text-3xl p-4 font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                HomeEase
              </h5>
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
