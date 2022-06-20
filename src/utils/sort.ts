import { PostType } from '../types/PostType';
const moment = require('moment');

export const sortData = (arr: PostType[]) => {
  console.log(arr, 'sorting arraayyyy');
  arr.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
}