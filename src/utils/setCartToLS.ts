import { ICartState } from '../store/reducers/cartSlice';

export const setCartToLS = (cart: ICartState) => {
  try {
    const json = JSON.stringify(cart);
    localStorage.setItem('cart', json);
  } catch (error) {
    console.log(error);
  }
};
