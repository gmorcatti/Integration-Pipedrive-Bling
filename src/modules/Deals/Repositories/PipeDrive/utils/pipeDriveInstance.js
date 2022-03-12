import axios from "axios";

const {
    PIPEDRIVE_API_KEY,
    PIPEDRIVE_URL
} = process.env;

const pipeDriveInstance = axios.create({
    baseURL: PIPEDRIVE_URL,
    params: {
        api_token: PIPEDRIVE_API_KEY
    }
})

export default pipeDriveInstance