import React from "react";
import ReactDOM from "react-dom/client";
import { Search } from "./Search";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  </React.StrictMode>
);
