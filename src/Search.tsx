import React from "react";

export const Search = () => {
  return (
    <div className="flex flex-col w-full items-center pt-20 max-w-lg mx-auto space-y-8">
      <h1 className="text-4xl">The Anvesana Search Demo</h1>
      <input type="text" className="border w-full text-lg p-2" />
      <button type="submit" className="border px-4 py-2">Search</button>
    </div>
  );
};
