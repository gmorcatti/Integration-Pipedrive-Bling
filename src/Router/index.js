import { Router } from 'express'

import RoutesController from '../modules/Deals/Controller/routesController.js'

const router = Router();
const routesController = new RoutesController();

router.get('/dailyAggregate', routesController.getAllCollection)

export default router;