import axios from "axios";
import { Todo } from "../types/todo"
import { Project } from "../types/projects";
import { Product } from "../types/products";

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

// NOTE: We will use this for mutation. This is to delete an item to the database/list.
export const deleteTodo = async (id: number) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  await axiosInstance.delete<Todo>(`todos/${id}`)
}

export const getPaginatedProjects = async (page = 1, limit = 3) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  // Also, the underscores are needed as because that is the syntax/convention that json-server follows when dishing out paginated data
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=${limit}`)).data
}

export const getInfiniteScrollProducts = async ({pageParam}: {pageParam: number}) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  // This implementation is for infinite scrolling.
  // Also, the underscores are needed as because that is the syntax/convention that json-server follows when dishing out paginated data
  return (await axiosInstance.get<Product[]>(`products?_page=${pageParam + 1}&_limit=3`)).data
}

export const getSingleProduct = async (id: number) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Product>(`products/${id}`)).data
}