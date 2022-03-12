import AggregateDealsSchema from '../../Model/aggregateDeals.js'

class MongoRepository {
    createDailyAggregate(info) {
        return AggregateDealsSchema.create(info)
    }

    getAllDailyAggregate() {
        return AggregateDealsSchema.find({})
    }
}

export default MongoRepository