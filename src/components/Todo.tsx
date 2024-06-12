import { useTodosIds } from "../services/queries"

const Todo = () => {

  const todoIdsQuery = useTodosIds()
  // NOTE: Some of the possible options that you can check and render JSX based on. They can be auto-suggested by the linter
  // console.log(todoIdsQuery.data, todoIdsQuery.status, todoIdsQuery.error, todoIdsQuery.isError, todoIdsQuery.isLoading, todoIdsQuery.isFetched, todoIdsQuery.isStale);

  if(todoIdsQuery.isPending)
    return (
      <>
        <span>Loading...</span>
      </>
    )

  if(todoIdsQuery.isError)
    return (
      <>
        <span>Something went wrong!</span>
      </>
    )

  return (
    <>
      <div>Todo</div>
      {
        todoIdsQuery.data.map((id) => {
          return(
            <div key={id}>
              {id}
            </div>
          )
        })
      }
    </>
  )
}

export default Todo