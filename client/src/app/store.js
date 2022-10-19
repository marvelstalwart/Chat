import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import usersSlice  from '../features/users/usersSlice';
import messageSlice from '../features/messages/messageSlice';
import  socketSlice  from '../features/socket/socketSlice';
import avatarSlice from '../features/avatar/avatarSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck: false
  }),
  reducer: {
    auth: authSlice,
    users: usersSlice,
    messages: messageSlice,
    socket: socketSlice,
    avatar: avatarSlice
  },
});
