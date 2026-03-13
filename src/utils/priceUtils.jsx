export const calculateSellingPrice = (item) => {
  const discount = item.discount ?? 0;
  const originalPrice = item.originalPrice ?? item.price ?? 0;

  return Math.round((originalPrice * (100 - discount)) / 100);
};

export const calculateCartSummary = (items, couponDiscount = 0) => {
  const totalOriginalPrice = items.reduce((sum, item) => {
    const price = item.originalPrice ?? item.price ?? 0;
    return sum + price * item.qty;
  }, 0);

  const totalSellingPrice = items.reduce((sum, item) => {
    const selling = calculateSellingPrice(item);
    return sum + selling * item.qty;
  }, 0);

  const totalDiscount = totalOriginalPrice - totalSellingPrice;

  const totalCustomerPrice = totalSellingPrice - couponDiscount;

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return {
    totalOriginalPrice,
    totalSellingPrice,
    totalDiscount,
    totalCustomerPrice,
    totalItems,
  };
};
