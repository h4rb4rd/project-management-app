export const getNewOrder = (index: number): number => {
  const time = new Date().getMilliseconds();
  const newOrder = parseInt((index + 1).toString() + time.toString());
  return newOrder;
};
