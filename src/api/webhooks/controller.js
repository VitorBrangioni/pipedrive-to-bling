const { PipedriveResponse, SalesOrder } = require("../../config/models");
const BlingHelper = require("../../helpers/BlingHelper");
const blingApi = require("../../services/bling");
const testRes = require('./test-response')

exports.updated = async (req, res) => {
  const pipedriveResCreated = await PipedriveResponse.create(req.body);
  // const { current, previous } = req.body;
  const { current, previous } = testRes;

  if (!(previous.status !== "won" && current.status === "won")) {
    res.sendStatus(200);
    return;
  }
  const xml = await BlingHelper.getXmlFromPipedriveDeal(current);
  const orderCreated = await blingApi.registerSalesOrder(xml);

  if (orderCreated.retorno.erros) {
    res.status(500).json({
      blingError: orderCreated,
    });
    return;
  }
  // const pedido = orderCreated.pedido;
  const pedido = orderCreated.retorno.pedidos[0];

  SalesOrder.create({
    internalObservation: pedido.obs_internas,
    date: pedido.data,
    saler: pedido.vendedor,
    paymentInstallments: pedido.parcelas,
    customer: pedido.cliente,
    itens: pedido.itens,
    pipedriveDealId: current.id,
    pipedriveResponseId: pipedriveResCreated._id,
    blingResponseId: orderCreated._id,
  }).then((salesOrderCreated) => {
    res.status(201).json(salesOrderCreated);
  });
};
