const blingFetch = require("./bling-fetch");

exports.registerSalesOrder = (xml) => {
  return blingFetch.post("pedido/json", xml)
  .then((response) => {
    console.log(response);
    return response;
  });
};