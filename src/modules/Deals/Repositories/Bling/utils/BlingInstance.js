import axios from "axios";

const blingInstance = axios.create({
    baseURL: 'https://bling.com.br/Api/v2',
})

export default blingInstance