import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user';
import { cartSlice } from './states/cart';
import type { User } from '@/models';

export interface AppStore {
  user: User;
  cart: any;
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer
  }
});

export default store;
