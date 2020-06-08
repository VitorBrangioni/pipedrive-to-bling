const fetch = require("node-fetch");

const hostApi = 'https://ufrilla.pipedrive.com/api/v1';
const apiToken = '4c167133e0d5e14ccd99331235bcc0a66030f7f4';

const params = new URLSearchParams();
params.append("api_token", apiToken);

exports.get = async (endpoint) => {
  const response = await fetch(`${hostApi}/${endpoint}?api_token=${apiToken}`);

  return response.json();
}