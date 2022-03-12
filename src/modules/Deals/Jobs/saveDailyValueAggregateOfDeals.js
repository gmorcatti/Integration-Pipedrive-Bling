import { scheduleJob } from "node-schedule";

import JobController from "../Controller/jobController.js";

const jobController = new JobController();

const job = scheduleJob('10 0 * * *', async function () {
    console.log('saveDailyValueAggregateOfSalesOrder Job Started', new Date().toLocaleString())

    await jobController.getDailyValueAggregateAndSave();

    console.log('saveDailyValueAggregateOfSalesOrder Job Ended', new Date().toLocaleString())
});

export default job