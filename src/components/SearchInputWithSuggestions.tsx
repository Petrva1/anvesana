import { useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type SearchProps = {
  value: string;
  onChange: (text: string) => void;
  suggestions: string[];
};

export const SearchInputWithSuggestions = ({
  value,
  onChange,
  suggestions,
}: SearchProps) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, () => setIsInputFocused(false));

  const relevantSuggestions = useMemo(
    () =>
      suggestions.filter((suggestionFromList) => {
        const suggestion = suggestionFromList.toLowerCase();
        const string = value.toLowerCase();

        return suggestion.includes(string);
      }),
    [suggestions, value]
  );

  return (
    <span ref={wrapperRef} className="w-full relative">
      <input
        type="text"
        className="border w-full text-lg p-2 rounded-md"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onFocus={() => setIsInputFocused(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsInputFocused(false);
          }
        }}
      />
      {value.length > 0 && (
        <div className="flex justify-center items-center absolute right-0 pr-3 top-0 h-full">
          <button className="p-1" onClick={() => onChange("")}>
            ✕<span className="sr-only">Clear field</span>
          </button>
        </div>
      )}
      {relevantSuggestions.length > 0 && isInputFocused && (
        <ul className="absolute w-full bg-white shadow-lg mt-4 py-2 rounded-lg border z-10">
          {relevantSuggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                className="w-full h-full text-left bg-white hover:bg-gray-100 px-4 py-2"
                onClick={() => {
                  setIsInputFocused(false);
                  onChange(suggestion);
                }}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};
