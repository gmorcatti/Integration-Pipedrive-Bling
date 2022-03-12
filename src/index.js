import express  from "express"

import 'dotenv/config';
import 'express-async-errors';

import router from './Router/index.js'
import errorHandler from "./Errors/ErrorHandler.js";

// Start Jobs
import './modules/Deals/Jobs/getDealsFromPipeDriveAndSendToBling.js'
import './modules/Deals/Jobs/saveDailyValueAggregateOfDeals.js'

const app = express();
const PORT = 3000;

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));