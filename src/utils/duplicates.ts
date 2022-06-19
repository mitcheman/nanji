import { PostType } from '../Shared/Types';

const moment = require('moment');

export const duplicates = (arr: PostType[]) => {
  type countType = {
    [key: string]: any;
  };
  const count: countType = {};
  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i].date]) {
      arr[i].date = '';
    } else {
      count[arr[i].date] = 1;
    }
  }
  return arr;
};

export const duplicatesByMonth = (arr: PostType[]) => {
  type countType = {
    [key: string]: boolean;
  };
  const count: countType = {};
  let arrToReturn = [];
  for (let i = 0; i < arr.length; i++) {
    if (!count[moment(arr[i].date).format('YYYY-MM')]) {
      count[moment(arr[i].date).format('YYYY-MM')] = true;
      arrToReturn.push(arr[i]);
    }
  }
  return arrToReturn;
};
