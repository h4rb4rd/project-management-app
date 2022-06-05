export const getNewOrder = (index: number): number => {
  const time = new Date().getMilliseconds();
  const newOrder = (index + 1) * 1000 + time;
  return newOrder;
};
