import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import usersSlice  from '../features/users/usersSlice';
import messageSlice from '../features/messages/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    messages: messageSlice
  },
});
