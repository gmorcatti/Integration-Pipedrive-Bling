import { scheduleJob } from "node-schedule";

import JobController from "../Controller/jobController.js";

const jobController = new JobController();

const job = scheduleJob('*/10 * * * *', async function () {
    console.log('getDealsFromPipeDriveAndSendToBling Job Started', new Date().toLocaleString())

    await jobController.getWonDealsAndCreateSalesOrder();
    
    console.log('getDealsFromPipeDriveAndSendToBling Job Ended', new Date().toLocaleString())
});

export default job