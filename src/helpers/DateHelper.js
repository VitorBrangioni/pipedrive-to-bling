const Moment = require('moment');

class DateHelper {
  constructor() {
    throw new Error("Dont't permitted instancing DateHelper");
  }

  static formatDatetime(datetime) {
    console.log(datetime)
    return (
        Moment(datetime)
        .format("DD/MM/YYYY HH:mm")
    );
  }

  static formatDatetimeToBrDate(datetime) {
    return (
        Moment(datetime)
        .format("DD/MM/YYYY")
    );
  }
}
module.exports = DateHelper;