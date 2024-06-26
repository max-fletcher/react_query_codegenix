import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInfiniteScrollProducts, getPaginatedProjects, getSingleProduct, getTodo, getTodos, getTodosIds } from "./api";
import { Product } from "../types/products";

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

export function useTodos() { // We can pass params here and use them to set "useQuery" options below.
  return useQuery({
    queryKey: ['all_todos'],
    queryFn: getTodos,
    refetchOnWindowFocus: false, // This is an option that causes fresh data to be fetched when we click to visit another tab or click to visit another application away from the browser. Default is true.
    retry: 3, // This is an option that defines how many times to retry before throwing error. Default is 5.
    refetchInterval: 20000, // This is an option that defines how long to wait before refetch/retry is ran again if retry fails every time(i.e if retry = 3 and fails all 3 times, it will wait this much time before refetch/retry is ran again).
  })
}

// NOTE: The type says that ids may be an array of numbers or an empty array or undefined.
export function useCustomTodos(ids: (number | undefined)[] | undefined) { // We can pass params here and use them to set "useQuery" options below.
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

export function useProjects(page: number, limit: number) { // We can pass params here and use them to set "useQuery" options below.
  return useQuery({
    queryKey: ['projects', {page, limit}],
    // IMP NOTE: Look carefully at the function provided to queryFn. This syntax is used when we are passing arguments(e.g query string params or otherwise)to the api call 
    // function(i.e in this case "getPaginatedProjects")
    queryFn: () => getPaginatedProjects(page, limit),
    // IMP NOTE: This option allows us to keep the previous data as placeholder while new data is being fetched via API call. We use this when we don't want to show a loader when fetching new
    // data. The way react query does this is by not changing the data state while new data is in the middle of being queried(i.e when we press the "next" or "previous" button) and seamlessly
    // replacing old data with new data. This is useful because under normal circumstances, when the page param changes, this causes a re-render, and hence, a flicker that is not good to look at.
    placeholderData: keepPreviousData
    // refetchOnWindowFocus: false, // This is an option that causes fresh data to be fetched when we click to visit another tab or click to visit another application away from the browser. Default is true.
    // retry: 3, // This is an option that defines how many times to retry before throwing error. Default is 5.
    // refetchInterval: 20000, // This is an option that defines how long to wait before refetch/retry is ran again if retry fails every time(i.e if retry = 3 and fails all 3 times, it will wait this much time before refetch/retry is ran again).
  })
}

export function useProducts() { // We can pass params here and use them to set "useQuery" options below.
  // NOTE: We are using "useInfiniteQuery" here so that we can implement infinite scrolling. It is provided by "tanstack-query" by default. Also note that we are using some additional options here
  // i.e initialPageParam, getNextPageParam, getPreviousPageParam, to make it work properly.
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getInfiniteScrollProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if(lastPage.length === 0){
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if(firstPageParam <= 1){
        return undefined
      }
      return firstPageParam - 1
    }
    // refetchOnWindowFocus: false, // This is an option that causes fresh data to be fetched when we click to visit another tab or click to visit another application away from the browser. Default is true.
    // retry: 3, // This is an option that defines how many times to retry before throwing error. Default is 5.
    // refetchInterval: 20000, // This is an option that defines how long to wait before refetch/retry is ran again if retry fails every time(i.e if retry = 3 and fails all 3 times, it will wait this much time before refetch/retry is ran again).
  })
}

export function useSingleProduct(id: number | null) { // We can pass params here and use them to set "useQuery" options below.
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getSingleProduct(id!),
    enabled: !!id, // this is to ensure that this query runs only if id has a value/is defined, else, this query will not run at all
    // NOTE: This is for optimization purposes. If the product with give ID is already in products cache, then we show it as placeholder data, making showing it a lot faster. This also demonstrates that
    // we can access cache data using queryClient.getQueryData inside another query/mutation.
    placeholderData: () => { 
      // NOTE: Get Products from cache and flatten/convert it to 1D array(remember that in order to use infinite scrolling, we were using "useInfiniteQuery" that groups up fetched data(i.e a 2D array))
      const cachedProducts = (queryClient.getQueryData(["products"]) as { pages: Product[] | undefined })?.pages?.flat(2)

      // NOTE: Find and return product if it is in cache.
      if(cachedProducts){
        return cachedProducts.find((item) => item.id === id)
      }
    }
  })
}