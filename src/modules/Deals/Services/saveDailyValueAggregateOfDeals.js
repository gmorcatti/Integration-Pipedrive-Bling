class SaveDailyValueAggregateOfDeals {

    constructor({ pipeDriveRepository, blingRepository }) {
        this.pipeDriveRepository = pipeDriveRepository;
        this.blingRepository = blingRepository;
    }

    async handle() {
        return await this.blingRepository.getSalesOrderByDay()
    }

}

export default SaveDailyValueAggregateOfDeals