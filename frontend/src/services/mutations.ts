import { useMutation } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo } from "./api";

// NOTE: There are 2 ways to communicate with the backend 1.Queries and 2.Mutation. Mutations are when we need to add,edit,update and delete items.
// While we can define Mutations in the same file as Queries, it maybe better to separate them as per your preference
export function useCreateTodo() {
  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => { // This function will run everytime we use this hook
      console.log("Mutate")
    },
    onError: (error) => { // This function will run if this hook encounters an error during execution
      console.log('Error', error.message);
    },
    onSuccess: () => { // This function will run if this hook successfully executes
      console.log('Success');
    }
  })
}