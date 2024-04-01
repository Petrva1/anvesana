import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "./components/Spinner";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/Table/DataTable";
import { SortableTableHeader } from "./components/Table/SortableTableHeader";
import { SearchInputWithSuggestions } from "./components/SearchInputWithSuggestions";

const SUGGESTIONS = ["Rick", "Morty", "Smith"];

type Character = {
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

const columns: ColumnDef<Character>[] = [
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
  const { data, refetch, isLoading, isError } = useQuery<CharactersResponse>({
    enabled: false,
    queryKey: ["characters"],
    queryFn: () =>
      fetch(
        `https://rickandmortyapi.com/api/character/${
          !!searchString ? `?name=${searchString}` : ""
        }`
      ).then((res) => res.json()),
  });

  const handleInputChange = (text: string) => setSearchString(text);

  return (
    <div className="flex flex-col w-full items-center py-20 max-w-lg mx-auto space-y-8">
      <h1 className="text-4xl">The Anvesana Search Demo</h1>

      <div className="flex w-full space-x-4">
        <SearchInputWithSuggestions
          value={searchString}
          onChange={handleInputChange}
          suggestions={SUGGESTIONS}
        />

        <button
          onClick={() => refetch()}
          className="border px-4 py-2 bg-white hover:bg-muted/50 active:bg-muted transition-colors rounded-md"
        >
          Search
        </button>
      </div>

      {isError ? (
        <div className="text-red-600">An error has occurred.</div>
      ) : isLoading ? (
        <Spinner />
      ) : (
        !!data && (
          <DataTable columns={columns} data={data.results} className="w-full" />
        )
      )}
    </div>
  );
};
