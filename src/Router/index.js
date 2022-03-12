import { Router } from 'express'

import RoutesController from '../modules/Deals/Controller/routesController.js'

const router = Router();
const routesController = new RoutesController();

router.get('/dailyAggregate', routesController.getAllCollection)

router.get('/deals', routesController.getAllPipeDriveDeals)
router.post('/salesOrder', routesController.createBlingSalesOrder)
router.post('/test', routesController.saveDailyValueAggregateOfDeals)

export default router;