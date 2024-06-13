import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodos, getTodosIds } from "./api";

// NOTE: These functions are used to cache any API responses that we make(using axios calls from "api.ts") and return data from said cache when needed.
// These function do not need types as the react-query package is intelligent enough to know what these may return.
export function useTodosIds() { // We can pass params with "useTodosIds" and use them to set "useQuery" options below.
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodosIds,
    refetchOnWindowFocus: false, // This is an option that causes fresh data to be fetched when we click to visit another tab or click to visit another application away from the browser. Default is true.
    retry: 3, // This is an option that defines how many times to retry before throwing error. Default is 5.
    refetchInterval: 20000, // This is an option that defines how long to wait before refetch/retry is ran again if retry fails every time(i.e if retry = 3 and fails all 3 times, it will wait this much time before refetch/retry is ran again).
  })
}

export function useTodos() { // We can pass params with "useTodo" and use them to set "useQuery" options below.
  return useQuery({
    queryKey: ['all_todos'],
    queryFn: getTodos,
    refetchOnWindowFocus: false, // This is an option that causes fresh data to be fetched when we click to visit another tab or click to visit another application away from the browser. Default is true.
    retry: 3, // This is an option that defines how many times to retry before throwing error. Default is 5.
    refetchInterval: 20000, // This is an option that defines how long to wait before refetch/retry is ran again if retry fails every time(i.e if retry = 3 and fails all 3 times, it will wait this much time before refetch/retry is ran again).
  })
}

// NOTE: The type says that ids may be an array of numbers or an empty array or undefined.
export function useCustomTodos(ids: (number | undefined)[] | undefined) { // We can pass params with "useTodo" and use them to set "useQuery" options below.
  // NOTE: The difference betw useQuery and useQueries is that useQueries can take multiple queries(i.e paralles queries). The "useQueries" hook will not return anything until all promises are resolved.
  // These promises must be in the form of an object as far as I can deduce from the code below.
  return useQueries({
    // NOTE: we are using "(ids ?? [])"(null coalesceing) and "id!"(meaning never null/undefined in typescript) to get rid of a typescript error
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["custom_todos", id],
        queryFn: () => getTodo(id!)
      }
    }),
  })
}