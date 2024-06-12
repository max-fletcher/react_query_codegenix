import { useQuery } from "@tanstack/react-query";
import { getTodosIds } from "./api";

// NOTE: These functions are used to cache any API responses that we make(using axios calls from "api.ts") and return data from said cache when needed.
// These function do not need types as the react-query package is intelligent enough to know what these may return
export function useTodosIds() { // We can pass params with "useTodosIds" and use them to set "useQuery" options below
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodosIds,
    // refetchOnWindowFocus: true // This is an option that causes fresh data to be fetched when we click to visit another tab or click to visit another application away from the browser
  })
}