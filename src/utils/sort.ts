import { PostType } from '../Shared/Types';

const moment = require('moment');

export const sortData = (arr: PostType[]) =>
  arr.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
