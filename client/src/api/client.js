import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    config.headers['x-user-id'] = 'user-header'
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            const data = error.response.data
            let message = 'Request Failed'

            if (data.message) {
                message = typeof data.message === 'string' ? data.message : data.message.join(', ')
            } else if (data.error) {
                message = data.error
            }

            const err = new Error(message)
            err.status = err.response.status
            throw err
        }
        throw error
    }
)