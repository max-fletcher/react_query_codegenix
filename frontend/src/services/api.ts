import axios from "axios";
import { Todo } from "../types/todo"

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({baseURL:BASE_URL})

export const getTodosIds = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Todo[]>(`todos`)).data.map((todo: Todo) => {
    return todo.id
  })
}

export const getTodos = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Todo[]>(`todos`)).data.map((todo: Todo) => {
    return todo
  })
}

export const getTodo = async (id: number) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  console.log('getting todos')
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data
}

// NOTE: We will use this for mutation. This is to add an item to the database/list.
export const createTodo = async (data: Todo) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  await axiosInstance.post<Todo>(`todos`, data)
}

// NOTE: We will use this for mutation. This is to update an item to the database/list.
export const updateTodo = async (data: Todo) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  await axiosInstance.put<Todo>(`todos/${data.id}`, data)
}