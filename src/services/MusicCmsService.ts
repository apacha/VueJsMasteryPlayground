import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getCompositions(limit: number, offset: number) {
        return apiClient.get('/api/composition?limit=' + limit + '&offset=' + offset)
        // return apiClient.get('/api/composition/')
    },
    getCompositionDetails(id: number) {
        return apiClient.get('/api/composition/' + id)
    }
}