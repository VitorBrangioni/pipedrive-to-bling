const blingFetch = require("./bling-fetch");

exports.registerSalesOrder = (xml) => {
  return blingFetch.post("pedido/json", xml);
};