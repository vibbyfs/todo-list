import { useQuery } from "@tanstack/react-query";
import { fetchTodoDetail } from "../../../api/todos";


export function UseTodoDetail(id) {
    return useQuery({
        queryKey: ['todosDetail', id],
        queryFn: () => fetchTodoDetail(id),
        enabled: !!id
    })
}