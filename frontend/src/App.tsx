import AllTodos from "./components/AllTodos"
import CustomTodo from "./components/CustomTodo"
import Products from "./components/Products"
import Projects from "./components/Projects"
import Todo from "./components/Todo"

const App = () => {
  return (
    <>
      <div>
        Paginated Products:
        <Products />
      </div>
      <hr />
      <div>
        Paginated Projects:
        <Projects />
      </div>
      <hr />
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