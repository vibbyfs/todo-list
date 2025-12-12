import { useQuery } from "@tanstack/react-query";
import { fetchTodoDetail } from "../../../api/todos";


export function useTodoDetail(selectedId) {
    return useQuery({
        queryKey: ['todosDetail', selectedId],
        queryFn: () => fetchTodoDetail(selectedId),
        enabled: !!selectedId
    })
}