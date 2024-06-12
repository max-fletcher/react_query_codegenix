import { useIsFetching } from "@tanstack/react-query"
import { useTodos } from "../services/queries"

const AllTodos = () => {

  // NOTE: Some of the possible options that you can check and render JSX based on. They can be auto-suggested by the linter. You can also use destructuring and get/see them.
  // console.log(todoIdsQuery.data, todoIdsQuery.status, todoIdsQuery.isPending, todoIdsQuery.error, todoIdsQuery.isError, todoIdsQuery.isLoading, todoIdsQuery.isFetched, todoIdsQuery.isStale, todoIdsQuery.fetchStatus);
  // console.log(data, status, isPending, isError, error, isLoading, isFetched, isStale, fetchStatus);
  const { data, status, isPending, isError, error, isLoading, isFetched, isStale, fetchStatus } = useTodos()

  // NOTE: this gives us the number of queries being ran at the time. Good for tracking performance and debugging
  const isFetching = useIsFetching()

  // NOTE: "fetchStatus" is what react-query is doing at the time, and "status" is what we got back from the server(i.e data, pending, error etc.).

  if(isPending)
    return (
      <>
        <span>Loading...</span>
        <div>Query function status: {fetchStatus}</div>
        <div>Query status: {status}</div>
        <div>Global isFetching: {isFetching}</div>
      </>
    )

  if(isError)
    return (
      <>
        <span>Something went wrong!</span>
        <div>Query function status: {fetchStatus}</div>
        <div>Query status: {status}</div>
        <div>Global isFetching: {isFetching}</div>
        <div>Error: {error.message}</div>
      </>
    )

  return (
    <>
      <div>Todo</div>
      <div>Query function status: {fetchStatus}</div>
      <div>Query status: {status}</div>
      <div>Global isFetching: {isFetching}</div>
      {
        data?.map((item) => {
          return(
            <div key={item.id}>
              <div> id: {item.id} </div>
              <div> title: {item.title} </div>
              <div> description: {item.description} </div>
            </div>
          )
        })
      }
    </>
  )
}

export default AllTodos