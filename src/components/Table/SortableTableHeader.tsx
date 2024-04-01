import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type SortableTableHeaderProps = {
  column: Column<any, unknown>;
  title: string;
};

export const SortableTableHeader = ({
  column,
  title,
}: SortableTableHeaderProps) => (
  <button
    className="flex items-center"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </button>
);
