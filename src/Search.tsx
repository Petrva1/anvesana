import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: any;
  location: any;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersResponse = {
  info: any;
  results: Character[];
};

export const Search = () => {
  const [searchString, setSearchString] = useState<string>("");
  const { data, refetch } = useQuery<CharactersResponse>({
    enabled: false,
    queryKey: ["posts"],
    queryFn: () =>
      fetch(
        `https://rickandmortyapi.com/api/character/${
          !!searchString ? `?name=${searchString}` : ""
        }`
      ).then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="flex flex-col w-full items-center pt-20 max-w-lg mx-auto space-y-8">
      <h1 className="text-4xl">The Anvesana Search Demo</h1>

      <span className="w-full relative">
        <input
          type="text"
          className="border w-full text-lg p-2"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        {searchString.length > 0 && (
          <div className="flex justify-center items-center absolute right-0 pr-3 top-0 h-full">
            <button className="p-1" onClick={() => setSearchString("")}>
              ✕
            </button>
          </div>
        )}
      </span>

      <button onClick={() => refetch()} className="border px-4 py-2">
        Search
      </button>
      {!!data && (
        <ul className="divide-y">
          {data.results.map((char) => (
            <div className="px-4 py-2" key={char.id}>
              {char.name}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
