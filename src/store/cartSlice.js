import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'cart';

function loadCart() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const initialState = {
  items: loadCart(), 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload; 
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...product, count: 1 });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    incrementItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.count += 1;
    },
    decrementItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.count -= 1;
        if (item.count <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, incrementItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalCount = (state) => state.cart.items.reduce((sum, i) => sum + i.count, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.count, 0);
