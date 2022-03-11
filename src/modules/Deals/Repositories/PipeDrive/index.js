import pipeDriveInstance from "./utils/pipeDriveInstance.js"

const {
    PIPEDRIVE_FILTER_ONLY_NOT_INTEGRATE_WON_DEALS_ID,
    PIPEDRIVE_BLING_INTEGRATED_DEAL_FIELD_KEY
} = process.env 

class PipeDriveRepository {

    async getAllWonDealsThatWasNotIntegrated() {
        const request = await pipeDriveInstance.get('/deals', {
            params: {
                filter_id: PIPEDRIVE_FILTER_ONLY_NOT_INTEGRATE_WON_DEALS_ID,
            }
        })

        return request.data.data
    }

    async updateDealIntegrationDetail({ dealId, value }) {
        const request = await pipeDriveInstance.put(`/deals/${dealId}`, {
            [PIPEDRIVE_BLING_INTEGRATED_DEAL_FIELD_KEY]: value,
        })

        return request.data
    }

}

export default PipeDriveRepository