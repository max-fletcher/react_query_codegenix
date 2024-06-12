import AllTodos from "./components/AllTodos"
import CustomTodo from "./components/CustomTodo"
import Todo from "./components/Todo"

const App = () => {
  return (
    <>
      <div>
        Custom Todos:
        <CustomTodo />
      </div>
      <hr />
      <div>
        All Todo Ids:
        <Todo />
      </div>
      <hr />
      <div>
        All Todos:
        <AllTodos />
      </div>
      <hr />

    </>
  )
}

export default App