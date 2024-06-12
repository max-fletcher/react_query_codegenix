import axios from "axios";
import { Todo } from "../types/todo"

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({baseURL:BASE_URL})

export const getTodosIds = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Todo[]>('todos')).data.map((todo: Todo) => {
    return todo.id
  })
}