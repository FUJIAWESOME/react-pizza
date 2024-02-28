export const getCartFromLS = () => {
  const emptyCartState = '{"items": [], "totalCount": 0, "totalPrice": 0}';

  try {
    const json = localStorage.getItem('cart') || emptyCartState;
    const data = JSON.parse(json);
    return data;
  } catch (error) {
    console.log(error);
  }
};
