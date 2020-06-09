const { SalesOrder } = require("../../config/models");
const pipedriveApi = require("../../services/pipedrive");
const blingApi = require("../../services/bling");
const BlingHelper = require("../../helpers/BlingHelper");

exports.mergePipedriveWithBling = async (req, res) => {
  const { dealStatus } = req.body;

  const deals = await pipedriveApi.getAllDealsByStatus(dealStatus);
  const dealsRegistered = [];
  const sts = {
    nRegistered: 0,
    nDeals: deals.length
  };
  const responses = [];
  let respostaTest = {};

  for (let i = 0; i < deals.length; i++) {
    const deal = deals[i];
    const saleOrder = await SalesOrder.findOne({ pipedriveDealId: deal.id });

    if (saleOrder) break;

    const { xml, products } = await BlingHelper.getDataFromPipedriveDeal(deal);
    const dealRegistered = await blingApi.registerSalesOrder(xml);

    responses.push(dealRegistered);

    if (!dealRegistered.retorno.erros) {
      const pedido = dealRegistered.retorno.pedidos[0];
      console.log(pedido)

      SalesOrder.create({
        internalObservation: pedido.obs_internas,
        date: deal.won_time,
        saler: pedido.vendedor,
        paymentValue: deal.value,
        customer: pedido.cliente,
        itens: products,
        pipedriveDealId: deal.id,
        blingResponseId: dealRegistered._id
      });

      respostaTest = dealRegistered;
      const { nRegistered } = sts;
      sts.nRegistered = nRegistered + 1;
    } 
    dealsRegistered.push(dealRegistered);
  }

  res.status(201).send({
    sts,
    responses
  });
};

exports.findAll = (req, res) => {
  SalesOrder.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
