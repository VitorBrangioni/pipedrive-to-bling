const pipedriveFetch = require("./pipedrive-fetch");

exports.listDealProducts = (dealId) => {
  return pipedriveFetch.get(`deals/${dealId}/products`).then((response) => {
    const { data } = response;

    return data ? data : [];
  });
};

exports.getAllDealsByStatus = (status) => {
  return pipedriveFetch.get('deals', [{ key: 'status', value: status }]).then((response) => {
    const { data } = response;

    return data;
  });
};
