import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, updateTodo } from "./api";

// NOTE: There are 2 ways to communicate with the backend 1.Queries and 2.Mutation. Mutations are when we need to add,edit,update and delete items.
// While we can define Mutations in the same file as Queries, it maybe better to separate them as per your preference
export function useCreateTodo() {
  const queryClient = useQueryClient() // Needed to run cache invalidation/refetch

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    // NOTE: Order of function ran when onMutate hook is ran is 1)On Mutate 2)OnSuccess/OnError(Depends on what the promise returns) 3)onSettled.
    onMutate: () => { // This function acts like an interceptor(runs BEFORE the hook/mutation is ran) and will run everytime we use this hook/mutation
      console.log("Mutate")
    },
    onError: (error) => { // This function will run if this hook/mutation encounters an error during execution
      console.log('Error', error.message);
    },
    onSuccess: () => { // This function will run if this hook/mutation successfully executes
      console.log('Success');
    },
    // NOTE: An underscore as function param indicates that the first param("data") is not to be used. We are unable to omit it due to the order of params passed so we are simply choosing to not make it accessible.
    // Remember the "async" in front of this function since we will be using "await" when invalidating cache.
    // The params for "onSettled" are data, error, variables. "data" is the response data returned("if any") by the promise. "error" is the error returned(if any) by the promise.
    // "variables" is the raw input data sent to the promise.
    onSettled: async (_, error) => { // This function will run every time AFTER we use this hook/mutation regardless of success or error, so its a good place to run cache invalidation
      // console.log('Settled', data, error, variables); // "data" is the response data returned("if any") by the promise. "error" is the error returned(if any) by the promise . "variables" is the raw input data sent to the promise.
      if(error){
        console.log(error);
      }
      else{
        console.log("here onSettled");
        await queryClient.invalidateQueries({ queryKey: ['todos'] }) // Invalidate cache using key "custom_todos"
      }
    }
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient() // Needed to run cache invalidation/refetch

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    // NOTE: Order of function ran when onMutate hook is ran is 1)On Mutate 2)OnSuccess/OnError(Depends on what the promise returns) 3)onSettled.
    onMutate: () => { // This function acts like an interceptor(runs BEFORE the hook/mutation is ran) and will run everytime we use this hook/mutation
      console.log("Mutate")
    },
    onError: (error) => { // This function will run if this hook/mutation encounters an error during execution
      console.log('Error', error.message);
    },
    onSuccess: () => { // This function will run if this hook/mutation successfully executes
      console.log('Success');
    },
    // NOTE: An underscore as function param indicates that the first param("data") is not to be used. We are unable to omit it due to the order of params passed so we are simply choosing to not make it accessible.
    // Remember the "async" in front of this function since we will be using "await" when invalidating cache.
    // The params for "onSettled" are data, error, variables. "data" is the response data returned("if any") by the promise. "error" is the error returned(if any) by the promise.
    // "variables" is the raw input data sent to the promise.
    onSettled: async (_, error) => { // This function will run every time AFTER we use this hook/mutation regardless of success or error, so its a good place to run cache invalidation
      // console.log('Settled', data, error, variables); // "data" is the response data returned("if any") by the promise. "error" is the error returned(if any) by the promise . "variables" is the raw input data sent to the promise.
      console.log('update onSettled')
      if(error){
        console.log(error);
      } else {
      // console.log("here onSettled for update");
        await queryClient.invalidateQueries({ queryKey: ['todos'] }) // Invalidate cache using key "todos"
        console.log('update invalidated');
        await queryClient.invalidateQueries({ queryKey: ['custom_todos'] }) // Invalidate cache using key "custom_todos"
      }
    }
  })
}