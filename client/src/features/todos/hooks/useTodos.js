import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from '../../../api/todos.js'

export function useTodos(search) {
    return useQuery({
        queryKey: ['todos', search],
        queryFn: () => fetchTodos(search),
        keepPreviousData: true
    })
}