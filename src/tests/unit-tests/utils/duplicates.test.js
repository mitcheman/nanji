import { duplicatesByMonth } from '../../../utils/duplicates';

const mockArray = [
  {
    date: '2022-06-07',
  },
  {
    date: '2022-06-10',
  },
  {
    date: '2022-05-10',
  },
  {
    date: '2021-06-10',
  },
  {
    date: '2021-06-28',
  },
  {
    date: '2012-07-10',
  },
  {
    date: '1998-06-10',
  },
];

const mockResultArray = [
  {
    date: '2022-06-07',
  },
  {
    date: '2022-05-10',
  },
  {
    date: '2021-06-10',
  },
  {
    date: '2012-07-10',
  },
  {
    date: '1998-06-10',
  },
];

describe('Utils Duplicate Methods', () => {
  test('duplicatesByMonth should return an array of posts that have a unique month and year', () => {
    expect(duplicatesByMonth(mockArray)).toEqual(mockResultArray);
  });
});
