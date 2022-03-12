import axios from "axios";

const { BLING_URL } = process.env;

const blingInstance = axios.create({
    baseURL: BLING_URL,
})

export default blingInstance