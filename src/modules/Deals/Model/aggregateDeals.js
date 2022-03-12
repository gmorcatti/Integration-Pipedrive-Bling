import mongoose from '../../../database/index.js';

const {
    Schema,
    model
} = mongoose;

const AggregateDealsSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    date: {
        type: String,
        required: [true, 'The date is required']
    },
    dailyValueInReais: {
        type: Number,
        required: [true, 'The Daily Value is required']
    }
});

const AggregateDeals = model('AggregateDeals', AggregateDealsSchema);

export default AggregateDeals;