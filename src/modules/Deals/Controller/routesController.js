import PipeDriveRepository from "../Repositories/PipeDrive/index.js";
import BlingRepository from "../Repositories/Bling/index.js";
import MongoRepository from "../Repositories/Mongo/index.js";

import GetAllWonDealsThatWasNotIntegrated from '../Services/getWonDealsAndCreateSalesOrder.js'
import SaveDailyValueAggregateOfDeals from '../Services/SaveDailyValueAggregateOfDeals.js'
import GetAllMongoCollection from '../Services/getAllMongoCollection.js'

const pipeDriveRepository = new PipeDriveRepository();
const blingRepository = new BlingRepository();
const mongoRepository = new MongoRepository();

const getAllWonDealsThatWasNotIntegrated = new GetAllWonDealsThatWasNotIntegrated({
    pipeDriveRepository,
    blingRepository,
});

const saveDailyValueAggregateOfDeals = new SaveDailyValueAggregateOfDeals({
    blingRepository,
    mongoRepository,
});

const getAllMongoCollection = new GetAllMongoCollection({
    mongoRepository,
});

class RoutesController {

    async getAllCollection(req, res) {
        try {
            const data = await getAllMongoCollection.handle();
            return res.send(data)
        } catch (error) {
            const errorObj = {
                message: 'Internal Server Error',
                details: error.message,
                stack: error.stack,
                timestamp: new Date().getTime(),
            }
            console.error(errorObj)
            return res.status(500).send(errorObj)
        }
    }

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
            const data = await saveDailyValueAggregateOfDeals.handle();
            res.status(200).send(data)
        } catch(err) {
            console.log(err.isAxiosError)
            res.status(400).send(err?.response?.data || err.message)
        }
    }
}

export default RoutesController