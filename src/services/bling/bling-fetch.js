const fetch = require("node-fetch");
const { BlingResponse } = require('../../config/models');
const { blingToken } = require("../../config/apiTokens");
const hostApi = 'https://bling.com.br/Api/v2';

const params = new URLSearchParams();
params.append("apikey", blingToken);

exports.post = async (endpoint, xml) => {
  params.append('xml', xml);

  const response = await fetch(`${hostApi}/${endpoint}`, {
    method: "POST",
    body: params,
  });
  const responseJson = await response.json();
  const { _id } = await BlingResponse.create(responseJson);
  responseJson._id = _id;

  return responseJson;
}