import MongoRepository from "../Repositories/Mongo/index.js";

import GetAllMongoCollection from '../Services/getAllMongoCollection.js'

const mongoRepository = new MongoRepository();

const getAllMongoCollection = new GetAllMongoCollection({
    mongoRepository,
});

class RoutesController {

    async getAllCollection(req, res) {
        try {
            const data = await getAllMongoCollection.handle();
            return res.send(data)
        } catch (error) {
            const errorObj = {
                message: 'Internal Server Error',
                details: error.message,
                stack: error.stack,
                timestamp: new Date().getTime(),
            }
            console.error(errorObj)
            return res.status(500).send(errorObj)
        }
    }

}

export default RoutesController