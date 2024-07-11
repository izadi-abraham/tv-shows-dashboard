import axios from "axios";


export const fetch = axios.create({
    baseURL: 'https://api.tvmaze.com/'
})