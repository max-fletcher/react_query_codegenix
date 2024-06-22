import { useState } from "react"
import { useProjects } from "../services/queries"

const Projects = () => {
  const [page, setPage] = useState(1) // for pagination
  const [limit, setLimit] = useState(5) // for pagination

  // NOTE: "isPlaceholderData" is when we need to use old data as placeholder
  const {data, isPending, error, isError, isPlaceholderData, isFetching} = useProjects(page, limit)

  return (
    <>
      <div>
        <h3>Projects</h3>
        {
          isPending ? (
              <div>loading...</div>
            ) : isError ? (
                  <div>Error: {error.message}</div>
                ) : (
                      <div>
                        {
                          data.map((project) => {
                            return (
                              <p key={project.id}>{project.name}</p>
                            )
                          })
                        }
                      </div>
                    )
        }
      {/* NOTE: Math.max() returns the larger of the 2 values. This ensures that the value of page state is never less than 0 */}
      <button onClick={() => setPage((old) => Math.max(old - 1, 1))}>
        Previous Page
      </button>

      <span style={{ padding: 20 }}>Current page: {page}</span>

      {/* NOTE: The button only works if "isPlaceHolderData" is false as per "onClick" logic and "disabled" logic */}
      <button 
        onClick={() =>{
          if(!isPlaceholderData)
          setPage((old) => {
            return old + 1
          })
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      <br />
      {/* NOTE: A manual loader */}
      {isFetching ? <span>Loading...</span> : null}
      <br />

      <span style={{padding : "10px", paddingLeft: "0px" }}>Results per page:</span>
      <button 
        onClick={() =>{
          if(!isPlaceholderData)
          setLimit(3)
        }}
        disabled={isPlaceholderData}
      >
        3
      </button>
      <button 
        onClick={() =>{
          if(!isPlaceholderData)
          setLimit(5)
        }}
        disabled={isPlaceholderData}
      >
        5
      </button>
      <button 
        onClick={() =>{
          if(!isPlaceholderData)
          setLimit(10)
        }}
        disabled={isPlaceholderData}
      >
        10
      </button>
      </div>
    </>
  )
}

export default Projects