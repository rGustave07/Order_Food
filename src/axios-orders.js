import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-2fff0.firebaseio.com/'
})

export default instance