import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoStatus } from "../../../api/todos";

export function useUpdateTodoStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateTodoStatus,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })

            if (variables?.id) {
                queryClient.invalidateQueries({ queryKey: ['todoDetail', variables.id] })
            }
        }
    })
}