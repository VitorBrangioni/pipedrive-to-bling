const convert = require("xml-js");
const { SalesOrder } = require("../../config/models");
const pipedriveApi = require("../../services/pipedrive");
const blingApi = require("../../services/bling");
const BlingHelper = require("../../helpers/BlingHelper");

exports.mergePipedriveWithBling = async (req, res) => {
  const wonDeals = await pipedriveApi.getAllDealsByStatus("won");
  const dealsRegistered = [];

  for (let i = 0; i < wonDeals.length; i++) {
    const deal = wonDeals[i];
    const saleOrder = await SalesOrder.findOne({ pipedriveDealId: deal.id });

    if (saleOrder) break;

    const xml = BlingHelper.getXmlFromPipedriveDeal(deal);
    const dealRegistered = await blingApi.registerSalesOrder(xml);

    dealsRegistered.push(dealRegistered);
  }

  res.status(201).json({ itensParaCadastrar: dealsRegistered.length });
};
