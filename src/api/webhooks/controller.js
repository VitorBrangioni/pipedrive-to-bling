const { PipedriveResponse, SalesOrder } = require("../../config/models");
const BlingHelper = require("../../helpers/BlingHelper");
const blingApi = require("../../services/bling");
const testRes = require('./test-response')

exports.updated = async (req, res) => {
  const pipedriveResCreated = await PipedriveResponse.create(req.body);
  const { current, previous } = req.body;

  if (!(previous.status !== "won" && current.status === "won")) {
    res.sendStatus(200);
    return;
  }
  const { xml, products } = await BlingHelper.getDataFromPipedriveDeal(current);
  const orderCreated = await blingApi.registerSalesOrder(xml);

  if (orderCreated.retorno.erros) {
    res.status(500).json({
      blingError: orderCreated,
    });
    return;
  }
  const pedido = orderCreated.retorno.pedidos[0];

  SalesOrder.create({
    internalObservation: pedido.obs_internas,
    date: current.won_time,
    saler: pedido.vendedor,
    paymentValue: current.value,
    customer: pedido.cliente,
    itens: products,
    pipedriveDealId: current.id,
    pipedriveResponseId: pipedriveResCreated._id,
    blingResponseId: orderCreated._id,
  }).then((salesOrderCreated) => {
    res.status(201).json(salesOrderCreated);
  });
};
