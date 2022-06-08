export const duplicates = (arr) => {
  const count = {};
  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i].date]) {
      arr[i].date = null;
    } else {
      count[arr[i].date] = 1;
    }
  }
  return arr;
};
