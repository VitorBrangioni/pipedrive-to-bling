const fetch = require("node-fetch");

const hostApi = 'https://ufrilla.pipedrive.com/api/v1';
const apiToken = '4c167133e0d5e14ccd99331235bcc0a66030f7f4';

const defaultParams = new URLSearchParams();
defaultParams.append("api_token", apiToken);

exports.get = (endpoint, params = []) => {
  params.forEach(param => defaultParams.append(param.key, param.value));

  return fetch(`${hostApi}/${endpoint}?api_token=${apiToken}`)
    .then(response => response.json());
}