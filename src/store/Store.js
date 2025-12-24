import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const STORAGE_KEY = 'cart';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart.items));
  } catch {

  }
});
