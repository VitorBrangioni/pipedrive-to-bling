const { SalesOrder } = require("../config/models");
const DateHelper = require("../helpers/DateHelper");
const pipedriveApi = require('../services/pipedrive');
const convert = require("xml-js");


class BlingHelper {
  constructor() {
    throw new Error("Dont't permitted instancing DateHelper");
  }

  static getJsonFromOrderSales(pipedriveDeal) {
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
        },
      },
    };
  }

  static async getDataFromPipedriveDeal(pipedriveDeal) {
    const dealFormatted = BlingHelper.getJsonFromOrderSales(pipedriveDeal);
    const jsonProductsToXml = { item: [] };
    let products = []

    if (pipedriveDeal.products_count) {
      products = await pipedriveApi.listDealProducts(pipedriveDeal.id);

      products.forEach((product) => {
        jsonProductsToXml.item.push({
          codigo: product.id,
          descricao: product.name,
          qtde: product.quantity,
          vlr_unit: product.item_price,
          un: "Un",
        });
      });
    }
    dealFormatted.pedido.itens = jsonProductsToXml;
    const xml = convert.json2xml(dealFormatted, { compact: true, spaces: 4 });

    return { xml, products };
  }
}


module.exports = BlingHelper;
