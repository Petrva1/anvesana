import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Spinner } from "./components/Spinner";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/DataTable";
import { SortableTableHeader } from "./components/SortableTableHeader";

const SUGGESTIONS = ["Rick", "Morty", "Smith"];

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

export const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "species",
    header: ({ column }) => (
      <SortableTableHeader column={column} title="Species" />
    ),
  },
];

export type CharactersResponse = {
  info: any;
  results: Character[];
};

export const Search = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  const { data, refetch, isLoading, isError } = useQuery<CharactersResponse>({
    enabled: false,
    queryKey: ["posts"],
    queryFn: () =>
      fetch(
        `https://rickandmortyapi.com/api/character/${
          !!searchString ? `?name=${searchString}` : ""
        }`
      ).then((res) => res.json()),
  });

  const relevantSuggestions = useMemo(
    () =>
      SUGGESTIONS.filter((suggestionFromList) => {
        const suggestion = suggestionFromList.toLowerCase();
        const string = searchString.toLowerCase();

        return suggestion.includes(string);
      }),
    [searchString]
  );

  useOnClickOutside(wrapperRef, () => setIsInputFocused(false));

  return (
    <div className="flex flex-col w-full items-center pt-20 max-w-lg mx-auto space-y-8">
      <h1 className="text-4xl">The Anvesana Search Demo</h1>

      <div className="flex w-full space-x-4">
        <span ref={wrapperRef} className="w-full relative">
          <input
            type="text"
            className="border w-full text-lg p-2"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === "Escape") {
                setIsInputFocused(false);
              }
            }}
          />
          {searchString.length > 0 && (
            <div className="flex justify-center items-center absolute right-0 pr-3 top-0 h-full">
              <button className="p-1" onClick={() => setSearchString("")}>
                ✕<span className="sr-only">Clear field</span>
              </button>
            </div>
          )}
          {relevantSuggestions.length > 0 && isInputFocused && (
            <ul className="absolute w-full bg-white shadow-lg mt-4 py-4 rounded-lg border">
              {relevantSuggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    className="w-full h-full text-left bg-white hover:bg-gray-100 p-4"
                    onClick={() => {
                      setIsInputFocused(false);
                      setSearchString(suggestion);
                    }}
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </span>
        <button onClick={() => refetch()} className="border px-4 py-2">
          Search
        </button>
      </div>

      {isError ? (
        <div className="text-red-600">An error has occurred.</div>
      ) : isLoading ? (
        <Spinner />
      ) : (
        !!data && (
          // <ul className="divide-y">
          //   {data.results.map((char) => (
          //     <div className="px-4 py-2" key={char.id}>
          //       {char.name}
          //     </div>
          //   ))}
          // </ul>
          <DataTable columns={columns} data={data.results} className="w-full" />
        )
      )}
    </div>
  );
};
