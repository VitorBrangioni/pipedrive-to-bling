const DateHelper = require('../DateHelper')

class OrderSalesModel {
  static getJson(pipedriveDeal) {
    return {
      pedido: {
        obs_internas: `${pipedriveDeal.title} - pipedrive deal: ${pipedriveDeal.id}`,
        data: DateHelper.formatDatetimeToBrDate(pipedriveDeal.won_time),
        vendedor: pipedriveDeal.owner_name,
        parcelas: {
          parcela: {
            vlr: pipedriveDeal.value,
          },
        },
        cliente: {
          nome: pipedriveDeal.org_name,
        }
      },
    };
  }
}

module.exports = OrderSalesModel