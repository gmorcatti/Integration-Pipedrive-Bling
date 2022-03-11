import PipeDriveRepository from "../Repositories/PipeDrive/index.js";
import BlingRepository from "../Repositories/Bling/index.js";

import GetAllWonDealsThatWasNotIntegrated from '../Services/getWonDealsAndCreateSalesOrder.js'
import SaveDailyValueAggregateOfDeals from '../Services/SaveDailyValueAggregateOfDeals.js'

const pipeDriveRepository = new PipeDriveRepository();
const blingRepository = new BlingRepository();

const getAllWonDealsThatWasNotIntegrated = new GetAllWonDealsThatWasNotIntegrated({
    pipeDriveRepository,
    blingRepository
});

const saveDailyValueAggregateOfDeals = new SaveDailyValueAggregateOfDeals({
    pipeDriveRepository,
    blingRepository
});

class DealsController {
    async getAllPipeDriveDeals(req, res) {
        const allDeals = await pipeDriveRepository.getAllWonDealsThatWasNotIntegrated()
        res.send(allDeals)
    }

    async createBlingSalesOrder(req, res) {
        try {
            const oi = await blingRepository.createSalesOrder()
            res.send({ keys: Object.keys(oi), data: oi.data})
        } catch(e) {
            console.log(e.isAxiosError, e.response.data.retorno)
            res.send(e.response.data.retorno)
        }
    }

    async getWonDealsAndCreateSalesOrder(req, res) {
        await getAllWonDealsThatWasNotIntegrated.handle();
        res.send('ok')
    }

    async saveDailyValueAggregateOfDeals(req, res) {
        try {
            const deals = await saveDailyValueAggregateOfDeals.handle();
            res.status(200).send({ length: deals.retorno.pedidos.length})
        } catch(err) {
            console.log(err.isAxiosError)
            res.status(400).send(err?.response?.data || err.message)
        }
    }
}

export default DealsController