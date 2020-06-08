class Mirror {
  static do(sourceData, mirrorModel) {
    const obj = {};
    const keys = Object.keys(sourceData);

    keys.forEach((key) => {
      if (mirrorModel[key]) {
        const attrs = mirrorModel[key].split(".");

        if (attrs.length) {
          let curentObj = {};
          console.log(attrs);
          attrs.forEach((attr, i) => {
            if (curentObj.hasOwnProperty(attr)) {
                curentObj = object[key];
            }

            const lastAttr = i > 0 ? attrs[i - 1] : attr;
            curentObj[lastAttr] = {};
            curentObj = curentObj[attr];
          });
        }
        // obj[mirrorModel[key]] = sourceData[key];
      }
    });
    return obj;
  }
}

module.exports = Mirror;
