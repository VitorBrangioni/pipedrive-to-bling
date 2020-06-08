const convert = require("xml-js");
const responseTest = require("./test-response");
const { PipedriveResponse, SalesOrder } = require("../../config/models");
const OrderSalesModel = require("../../helpers/bling/OrderSalesModel");
const blingApi = require("../../services/bling");
const pipedriveApi = require("../../services/pipedrive");

exports.updated = async (req, res) => {
  const pipedriveResCreated = await PipedriveResponse.create(req.body);
  const { current, previous } = req.body;

  if (!(previous.status !== 'won' && current.status === 'won')) {
    res.sendStatus(200);
    return;
  }
  const blingModel = OrderSalesModel.getJson(current);
  const jsonProductsToXml =  { item: [] };

  if (current.products_count) {
    const products = await pipedriveApi.listDealProducts(current.id);

    products.forEach((product) => {
      jsonProductsToXml.item.push({
        codigo: product.id,
        descricao: product.name,
        qtde: product.quantity,
        vlr_unit: product.item_price,
        un: 'Un'
      });
    });
  }
  blingModel.pedido.itens = jsonProductsToXml;
  const xmlSalesOrderToBling = convert.json2xml(blingModel, { compact: true, spaces: 4 });
  const orderCreated = await blingApi.registerSalesOrder(xmlSalesOrderToBling);
  const { pedido } = blingModel;

  SalesOrder.create({
    internalObservation: pedido.obs_internas,
    date: pedido.data,
    saler: pedido.vendedor,
    paymentInstallments: pedido.parcelas,
    customer: pedido.cliente,
    itens: pedido.itens,
    pipedriveResponseId: pipedriveResCreated._id,
    blingResponseId: orderCreated._id
  }).then((salesOrderCreated) => {
    res.status(201).json(salesOrderCreated);
  });
};

exports.test = (req, res) => {
  PipedriveResponse.find({}).then((docs) => {
    console.log(docs);
    res.status(200).json(docs);
  });
};
