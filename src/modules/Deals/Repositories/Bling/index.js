import blingInstance from "./utils/BlingInstance.js";
import qs from 'qs';
import json2xml from "json2xml";

const { BLING_API_KEY } = process.env;

class BlingRepository {
    createSalesOrder(jsonData) {
        const data = {
            apikey: BLING_API_KEY,
            xml: json2xml(jsonData)
        }

        return blingInstance({
            url: '/pedido/json/',
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(data),
        })
    }

    async getSalesOrderByDay(date) {
        const params = {
            apikey: BLING_API_KEY,
            filters: `dataEmissao[${date} TO ${date}]`
        }

        const salesOrderByDayRequest = await blingInstance({
            url: '/pedidos/json/',
            method: 'GET',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            params,
        })

        return salesOrderByDayRequest.data.retorno
    }
}

export default BlingRepository