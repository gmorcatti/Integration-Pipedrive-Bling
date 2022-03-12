class SaveDailyValueAggregateOfDeals {

    constructor({ blingRepository, mongoRepository }) {
        this.blingRepository = blingRepository;
        this.mongoRepository = mongoRepository;
    }

    async handle() {
        const yesterdayDate = this.formatYesterdayDate();
        const { pedidos } = await this.blingRepository.getSalesOrderByDay(yesterdayDate);

        console.log(`It was inserted ${pedidos?.length || 0} sales order in date ${yesterdayDate}`);

        if(!pedidos) return

        const totalValue = pedidos.reduce((acc, cur) => {
            return acc+= +cur.pedido.totalvenda
        }, 0);

        console.log(`The total value of sales orders was "${totalValue}"`);

        const addedInfo = await this.mongoRepository.createDailyAggregate({
            dailyValueInReais: totalValue,
            date: yesterdayDate
        })

        console.log(`${addedInfo} was inserted in MongoDB`)
    }

    formatYesterdayDate() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)

        const day = String(yesterday.getDate()).padStart(2, '0');
        const month = String(yesterday.getMonth() + 1).padStart(2, '0');
        const year = yesterday.getFullYear();

        return `${day}/${month}/${year}`
    }

}

export default SaveDailyValueAggregateOfDeals