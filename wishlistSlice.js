import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: 'wishlist', 
  initialState: {
    items: [], 
  },
  reducers: {
    addToWishlist(state, action) {
      alert("Before addToWishlist: " + JSON.stringify(state)); 
      const newItem = action.payload; 
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.images[0],
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      alert("After addToWishlist: " + JSON.stringify(state)); // Стан після виконання дії
    },
    removeFromWishlist(state, action) {
      alert("Before removeFromWishlist: " + JSON.stringify(state)); // Стан до виконання дії
      const id = action.payload; 
      state.items = state.items.filter(item => item.id !== id); 
      alert("After removeFromWishlist: " + JSON.stringify(state)); // Стан після виконання дії
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
