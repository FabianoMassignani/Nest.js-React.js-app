import React from "react";
import { Navbar } from "../components/Navbar";

export const NotFoundPage = () => {
  return (
    <Navbar
      children={
        <div className="all-center" style={{ padding: "2rem 0" }}>
          <div>
            <h1>Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        </div>
      }
    />
  );
};