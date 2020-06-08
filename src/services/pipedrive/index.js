const pipedriveFetch = require("./pipedrive-fetch");

exports.listDealProducts = (dealId) => {
  return pipedriveFetch.get(`deals/${dealId}/products`)
  .then((response) => {
      const { data } = response;

    return (data) ? data : [];
  });
};