import { useIsFetching } from "@tanstack/react-query"
import { useCustomTodos, useTodosIds } from "../services/queries"

const CustomTodo = () => {
  // NOTE: Some of the possible options that you can check and render JSX based on. They can be auto-suggested by the linter. You can also use destructuring and get/see them.
  const todoIdsQuery = useTodosIds()
  const customTodoData = useCustomTodos(todoIdsQuery.data)
  console.log("customTodoData", customTodoData);

  // NOTE: this gives us the number of queries being ran at the time. Good for tracking performance and debugging
  const isFetching = useIsFetching()

  return (
    <>
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