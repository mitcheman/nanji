import { PostType } from '../Shared/Types';

const moment = require('moment');

export const duplicatesByMonth = (arr: PostType[]) => {
  type countType = {
    [key: string]: boolean;
  };
  const count: countType = {};
  let arrToReturn: PostType[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (!count[moment(arr[i].date).format('YYYY-MM')]) {
      count[moment(arr[i].date).format('YYYY-MM')] = true;
      arrToReturn.push(arr[i]);
    }
  }
  return arrToReturn;
};
