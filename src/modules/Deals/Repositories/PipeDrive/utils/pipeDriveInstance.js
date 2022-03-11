import axios from "axios";

const pipeDriveInstance = axios.create({
    baseURL: 'https://api.pipedrive.com/v1',
    params: {
        api_token: process.env.PIPEDRIVE_API_KEY
    }
})

export default pipeDriveInstance