import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      alert("Before addToCart: " + JSON.stringify(state)); // Стан до виконання дії
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.images[0],
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity += 1; 
      state.totalAmount += newItem.price;

      alert("After addToCart: " + JSON.stringify(state)); // Стан після виконання дії
    },
    removeFromCart(state, action) {
      alert("Before removeFromCart: " + JSON.stringify(state)); // Стан до виконання дії
      const id = action.payload; 
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity; 
        state.totalAmount -= existingItem.totalPrice; 

        state.items = state.items.filter(item => item.id !== id); 
      }

      alert("After removeFromCart: " + JSON.stringify(state)); // Стан після виконання дії
    },
    updateQuantity(state, action) {
      alert("Before updateQuantity: " + JSON.stringify(state)); // Стан до виконання дії
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount += (quantity * existingItem.price) - existingItem.totalPrice;

        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
      }

      alert("After updateQuantity: " + JSON.stringify(state)); // Стан після виконання дії
    },
    clearCart(state) {
      alert("Before clearCart: " + JSON.stringify(state)); // Стан до виконання дії
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      alert("After clearCart: " + JSON.stringify(state)); // Стан після виконання дії
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
