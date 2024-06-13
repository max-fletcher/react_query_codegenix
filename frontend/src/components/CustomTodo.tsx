import { useIsFetching } from "@tanstack/react-query"
import { useCustomTodos, useTodosIds } from "../services/queries"
import { useCreateTodo, useUpdateTodo } from "../services/mutations"
import { SubmitHandler, useForm } from "react-hook-form"
import { Todo } from "../types/todo"
import { useEffect } from "react"

const CustomTodo = () => {
  // NOTE: Some of the possible options that you can check and render JSX based on. They can be auto-suggested by the linter. You can also use destructuring and get/see them.
  const todoIdsQuery = useTodosIds()
  console.log("todoIdsQuery.data", todoIdsQuery.data);
  const customTodoData = useCustomTodos(todoIdsQuery.data)
  console.log("customTodoData", customTodoData)

  // NOTE: Comes from react-hook-form
  const {register, handleSubmit} = useForm<Todo>()

  // NOTE: Import mutation that is used to enter create data
  const createTodoMutation = useCreateTodo()
  // NOTE: function that will be ran when submit button is clicked
  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data)
  }
  
  // NOTE: Import mutation that is used to enter update data
  const updateTodoMutation = useUpdateTodo()
  // NOTE: function that will be ran checked checkbox is clicked
  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if(data){
      updateTodoMutation.mutate({...data, checked:true})
    }
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
          {/* NOTE: Disabling the button if createTodoMutation is in "isPending" state */}
          <input type="submit" disabled={createTodoMutation.isPending} value={createTodoMutation.isPending ? "Creating..." : "Create Todo"} />
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
                <div>
                  {/* NOTE: Disabling the button if todo is already checked */}
                  <button onClick={() => handleMarkAsDoneSubmit(data)} disabled={data?.checked}>
                    {data?.checked ? "Done" : "Mark as done"}
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default CustomTodo