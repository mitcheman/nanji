const moment = require('moment');

export const sortData = (arr) =>
  arr.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
