import { useIsFetching } from "@tanstack/react-query"
import { useCustomTodos, useTodosIds } from "../services/queries"
import { useCreateTodo } from "../services/mutations"
import { SubmitHandler, useForm } from "react-hook-form"
import { Todo } from "../types/todo"

const CustomTodo = () => {
  // NOTE: Some of the possible options that you can check and render JSX based on. They can be auto-suggested by the linter. You can also use destructuring and get/see them.
  const todoIdsQuery = useTodosIds()
  const customTodoData = useCustomTodos(todoIdsQuery.data)
  console.log("customTodoData", customTodoData)

  const {register, handleSubmit} = useForm<Todo>()

  const createTodoMutation = useCreateTodo()
  const handleCreateTodoSubmit : SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data)
  }

  // NOTE: this gives us the number of queries being ran at the time. Good for tracking performance and debugging
  const isFetching = useIsFetching()

  return (
    <>
      <div>
        <h3>Insert Custom Todo</h3>
        <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
          <h4>New Todo</h4>
          <input placeholder="title" {...register('title')} />
          <br />
          <input placeholder="description" {...register('description')} />
          <br />
          <input type="submit" />
        </form>
      </div>
    
      <div>Custom Todos</div>
      <div>Global isFetching: {isFetching}</div>
      <ul>
        {
          customTodoData.map(({data}) => {
            return(
              <li key={data?.id}>
                <div>Id: {data?.id}</div>
                <span>
                  <strong> Title: {data?.title} </strong>
                  <strong> Title: {data?.description} </strong>
                </span>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default CustomTodo