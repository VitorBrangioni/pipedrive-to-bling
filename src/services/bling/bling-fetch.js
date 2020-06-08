const fetch = require("node-fetch");

const hostApi = 'https://bling.com.br/Api/v2';
const apiKey = 'e762967d86b6c92bf0d25ed11d043265c2bf9f50521eed891498b171e1cae14a0e74dd32';

const params = new URLSearchParams();
params.append("apikey", apiKey);

exports.post = async (endpoint, xml) => {
  params.append('xml', xml);

  const response = await fetch(`${hostApi}/${endpoint}`, {
    method: "POST",
    body: params,
  });

  return response.json();
}