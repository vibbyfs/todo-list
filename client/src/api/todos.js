import { api } from "./client";

export async function fetchTodos(search = '') {
    const res = await api.get('/todos', {
        params: search ? { search } : {}
    })

    return res.data
}

export async function fetchTodoDetail(id) {
    const res = await api.get(`/todos/${id}/detail`)
    return res.data
}

export async function createTodo({ title }) {
    const res = await api.post('/todos', { title })
    return res.data
}

export async function updateTodoStatus({ id, status, problemDesc }) {
    const body = { status }

    if (problemDesc !== undefined && problemDesc !== null && problemDesc !== '') {
        body.problemDesc = problemDesc
    }
    const res = await api.patch(`/todos/${id}`, body)
    return res.data
}

