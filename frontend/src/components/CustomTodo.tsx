import { useIsFetching } from "@tanstack/react-query"
import { useCustomTodos, useTodosIds } from "../services/queries"
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../services/mutations"
import { SubmitHandler, useForm } from "react-hook-form"
import { Todo } from "../types/todo"

const CustomTodo = () => {
  // NOTE: Some of the possible options that you can check and render JSX based on. They can be auto-suggested by the linter. You can also use destructuring and get/see them.
  const todoIdsQuery = useTodosIds()
  console.log("todoIdsQuery.data", todoIdsQuery.data);
  const customTodoData = useCustomTodos(todoIdsQuery.data)
  console.log("customTodoData", customTodoData)

  // NOTE: Comes from react-hook-form
  const {register, handleSubmit} = useForm<Todo>()

  // NOTE: Import mutation
  const createTodoMutation = useCreateTodo() // is used to enter create data
  const updateTodoMutation = useUpdateTodo() // is used to enter update data
  const deleteTodoMutation = useDeleteTodo() // is used to enter delete data

  // NOTE: function that will be ran when submit button is clicked. Also it is highly recommended that you use an "await deleteTodoMutation.mutateAsync(id)" along with async before
  // the function else any additional logic here might not run in the correct order. The order of "before create", "after create" and "Mutate Create" console.logs should attest to this fact.
  const handleCreateTodoSubmit: SubmitHandler<Todo> = async (data) => {
    console.log('before create');
      // updateTodoMutation.mutate({...data, checked:true})
      await createTodoMutation.mutateAsync(data)
      console.log('after create');
  }

  // NOTE: function that will be ran when "checked" checkbox is clicked. Also it is highly recommended that you use an "await deleteTodoMutation.mutateAsync(id)" along with async before
  // the function else any additional logic here might not run in the correct order. The order of "before update", "after update" and "Mutate Update" console.logs should attest to this fact.
  const handleMarkAsDoneSubmit = async (data: Todo | undefined) => {
    if(data){
      console.log('before update');
      // updateTodoMutation.mutate({...data, checked:true})
      await updateTodoMutation.mutateAsync({...data, checked:true})
      console.log('after update');
    }
  }

  0// NOTE: function that will be ran when delete is clicked. Also it is highly recommended that you use an "await deleteTodoMutation.mutateAsync(id)" along with async before
  // the function else any additional logic here might not run in the correct order. The order of "before delete", "after delete" and "Mutate Delete" console.logs should attest to this fact.
  const handleDeleteTodo = async (id: number) => {
      console.log('before delete');
      // deleteTodoMutation.mutate(id)
      await deleteTodoMutation.mutateAsync(id)
      console.log('after delete');
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
                  {data && data.id && (
                    <button onClick={() => handleDeleteTodo(data.id!)}>Delete</button>
                  )}
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