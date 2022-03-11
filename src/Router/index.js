import { Router } from 'express'

import DealsController from '../modules/Deals/Controller/index.js'

const router = Router();
const dealsController = new DealsController();

router.get('/deals', dealsController.getAllPipeDriveDeals)
router.post('/salesOrder', dealsController.createBlingSalesOrder)
router.post('/test', dealsController.saveDailyValueAggregateOfDeals)

export default router;