const fetch = require("node-fetch");

const hostApi = 'https://ufrilla.pipedrive.com/api/v1';
const apiToken = '4c167133e0d5e14ccd99331235bcc0a66030f7f4';

const defaultParams = new URLSearchParams();
defaultParams.append("api_token", apiToken);

exports.get = (endpoint, params = []) => {
  let paramsString = '';

  params.forEach(({ key, value }) => {
    paramsString += `${key}=${value}`;
  });

  return fetch(`${hostApi}/${endpoint}?api_token=${apiToken}&${paramsString}`)
    .then(response => response.json());
}