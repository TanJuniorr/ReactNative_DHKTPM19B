import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: number[];
}
const initialState: WishlistState = { ids: [] };

// THỬ THÁCH (BT7.C1) — dùng lại ở buổi sau
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // BT7.C1: Bấm yêu thích lần nữa để bỏ khỏi danh sách.
    toggleWishlist(state, action: PayloadAction<number>) {
      const index = state.ids.indexOf(action.payload);
      if (index === -1) state.ids.push(action.payload);
      else state.ids.splice(index, 1);
    },
    hydrateWishlist(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
    },
  },
});

export const { toggleWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
