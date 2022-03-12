class GetAllMongoCollection {
    constructor({ mongoRepository }) {
        this.mongoRepository = mongoRepository;
    }

    async handle() {
        const allCollection = await this.mongoRepository.getAllDailyAggregate();
        return allCollection;
    }
}

export default GetAllMongoCollection