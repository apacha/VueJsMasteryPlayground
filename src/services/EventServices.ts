import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/apacha/VueJsMasteryPlayground',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

// | is the union operator for defining multiple types
type buttonType = 'primary' | 'secondary' | 'success' | 'danger'
let buttonStyle: buttonType = "primary"

type ComicUniverse = 'Marvel' | 'DC'
interface Hero {
    // Convention of using ; at the end
    name: string;
    age: number;
    active: boolean;
    powers: string[];
    universe: ComicUniverse
}
let person: Hero = {
    name: "Peter Parker",
    age: 20,
    active: true,
    powers: ["wall-crawl", "spider-sense"],
    universe: 'Marvel'
}

let addNumbers = (a: number, b: number): number => {
    return a + b
}

export default {
    getEvents(perPage: number, page: number) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEventDetails(id: number) {
        return apiClient.get('/events/' + id)
    }
}