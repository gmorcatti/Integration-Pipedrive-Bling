import { Schema, model } from '../../../database/index.js';

const AggregateDealsSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    dailyValueInReais: {
        type: Number,
        required: [true, 'The Daily Value is required']
    }
});

const AggregateDeals = model('AggregateDeals', AggregateDealsSchema);

export default AggregateDeals;