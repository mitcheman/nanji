const moment = require('moment');

export const duplicates = (arr) => {
  console.log(arr, 'arr at duplicates BEFORE')
  const count = {};
  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i].date]) {
      arr[i].date = null;
    } else {
      count[arr[i].date] = 1;
    }
  }
  console.log(arr, 'arr at duplicates AFTER')
  return arr;
};

export const duplicatesByMonth = (arr) => {
  console.log(arr, 'arr at duplicatesByMonth BEFORE')
  const count = {};
  for (let i = 0; i < arr.length; i++) {
    if (count[moment(arr[i].date).format('YYYY-MM')]) {
      arr[i].date = null;
    } else {
      count[moment(arr[i].date).format('YYYY-MM')] = 1;
    }
  }
  console.log(arr, 'arr at duplicatesByMonth AFTER')
  return arr;
};
