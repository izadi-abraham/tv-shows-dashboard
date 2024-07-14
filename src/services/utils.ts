import axios from "axios";


export const fetch = axios.create({
    baseURL: 'https://api.tvmaze.com/'
})


export const notifyError = (error: string) => {
    window.alert(`Sorry! Something went wrong, ${error}`)
}