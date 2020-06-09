// export const mirrors = require('./mirrors');

const Mirror = require('./Mirror');
const Deal = require('./mirrors/Deal.json')

const response = Mirror.do({ id: '1', title: 'title', value: 'value' }, Deal);
