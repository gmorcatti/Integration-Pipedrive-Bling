import PipeDriveRepository from "../Repositories/PipeDrive/index.js";
import BlingRepository from "../Repositories/Bling/index.js";
import MongoRepository from "../Repositories/Mongo/index.js";

import GetAllWonDealsThatWasNotIntegrated from '../Services/getWonDealsAndCreateSalesOrder.js'
import SaveDailyValueAggregateOfDeals from '../Services/saveDailyValueAggregateOfDeals.js'

const pipeDriveRepository = new PipeDriveRepository();
const blingRepository = new BlingRepository();
const mongoRepository = new MongoRepository();

class JobController {
    async getWonDealsAndCreateSalesOrder() {
        try {
            const getAllWonDealsThatWasNotIntegrated = new GetAllWonDealsThatWasNotIntegrated({
                pipeDriveRepository,
                blingRepository
            });
            
            await getAllWonDealsThatWasNotIntegrated.handle();
        } catch (error) {
            console.error({
                message: 'Internal Server Error',
                details: error.message,
                stack: error.stack,
                timestamp: new Date().getTime(),
            })
        }
    }

    async getDailyValueAggregateAndSave() {
        try {
            const saveDailyValueAggregateOfDeals = new SaveDailyValueAggregateOfDeals({
                blingRepository,
                mongoRepository,
            });
            
            await saveDailyValueAggregateOfDeals.handle();
        } catch (error) {
            console.error({
                message: 'Internal Server Error',
                details: error.message,
                stack: error.stack,
                timestamp: new Date().getTime(),
            })
        }
    }
}

export default JobController