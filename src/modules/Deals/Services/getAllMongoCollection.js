import NodeCache from 'node-cache';
const nodeCache = new NodeCache();

class GetAllMongoCollection {
    constructor({ mongoRepository }) {
        this.mongoRepository = mongoRepository;
    }

    async handle() {
        // if there's a cached collection the API doesn't need to request to Mongo each time a request is made.
        const cacheAllCollection = nodeCache.get( "allDailyAggregate" );

        if(cacheAllCollection) {
            console.log('Get the cached collection');
            return cacheAllCollection;
        }

        const allCollection = await this.mongoRepository.getAllDailyAggregate();

        // Create a cache for get the daily aggregate.
        const secondsUntilTheEndOfTheDay = this.getSecondsUntilTheEndOfTheDay();
        nodeCache.set("allDailyAggregate", allCollection, secondsUntilTheEndOfTheDay);

        return allCollection;
    }

    getSecondsUntilTheEndOfTheDay() {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const secondsUntilEndOfDay = (24 * 60 * 60) - (hour * 60 * 60) - (minutes * 60) - seconds;
        return secondsUntilEndOfDay;
    }
}

export default GetAllMongoCollection