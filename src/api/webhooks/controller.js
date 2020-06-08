const mongoose = require("mongoose");
const convert = require("xml-js");
const responseTest = require("./test-response");
// const PipedriveRes = mongoose.model('PipedriveRes');
const { PipedriveResponse, SalesOrder, BlingResponse } = require("../../config/models");
const OrderSalesModel = require("../../helpers/bling/OrderSalesModel");
const blingApi = require("../../services/bling");
const pipedriveApi = require("../../services/pipedrive");

exports.updated = async (req, res) => {
  const pipedriveWebhooksResponse = req.body;
  const { current, previous } = responseTest;

  // 1. Verificar se foi alterado para won
  if (!(previous.status !== 'won' && current.status === 'won')) {
    res.sendStatus(200);
    return;
  }
  const blingModel = OrderSalesModel.getJson(current);
  const jsonProductsToXml =  { item: [] };

  // 2. Verificar se tem produtos. Se tiver, entao buscar todos
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

  // 3. Mapeamento e transformacao em Xml
  blingModel.pedido.itens = jsonProductsToXml;
  const xmlSalesOrder = convert.json2xml(blingModel, { compact: true, spaces: 4 });

  // 4. Salvar pedido no bling
  const orderCreated = await blingApi.registerSalesOrder(xmlSalesOrder);
  const blingResCreated = await BlingResponse.create(orderCreated);

  // 5. Salvar pedido no mongo
  const { pedido } = blingModel;

  const pipedriveResCreated = await PipedriveResponse.create({ batata: 'batatinha', oi: 'oi' });

  SalesOrder.create({
    internalObservation: pedido.obs_internas,
    date: pedido.data,
    saler: pedido.vendedor,
    paymentInstallments: pedido.parcelas,
    customer: pedido.cliente,
    itens: pedido.itens,
    pipedriveResponseId: pipedriveResCreated._id,
    blingResponseId: blingResCreated._id
  }).then((created) => {
    console.log(created);
    res.status(201).json(blingModel);
  });
};

exports.test = (req, res) => {
  PipedriveResponse.find({}).then((docs) => {
    console.log(docs);
    res.status(200).json(docs);
  });
};
