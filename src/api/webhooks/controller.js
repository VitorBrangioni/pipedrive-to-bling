const { PipedriveResponse, SalesOrder } = require("../../config/models");
const BlingHelper = require("../../helpers/BlingHelper");
const blingApi = require("../../services/bling");

exports.updated = async (req, res) => {
  const pipedriveResCreated = await PipedriveResponse.create(req.body);
  const { current, previous } = req.body;

  if (!(previous.status !== 'won' && current.status === 'won')) {
    res.sendStatus(200);
    return;
  }
  const xmlSalesOrderToBling = BlingHelper.getJsonFromOrderSales(current);
  const orderCreated = await blingApi.registerSalesOrder(xmlSalesOrderToBling);
  const { pedido } = blingModel;

  SalesOrder.create({
    internalObservation: pedido.obs_internas,
    date: pedido.data,
    saler: pedido.vendedor,
    paymentInstallments: pedido.parcelas,
    customer: pedido.cliente,
    itens: pedido.itens,
    pipedriveDealId: current.id,
    pipedriveResponseId: pipedriveResCreated._id,
    blingResponseId: orderCreated._id
  }).then((salesOrderCreated) => {
    res.status(201).json(salesOrderCreated);
  });
};