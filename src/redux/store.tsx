import {configureStore} from '@reduxjs/toolkit';
import {userSlice, friendSlice, friendreqSlice, messageSlice} from './index';
const store = configureStore({
  reducer: {
    userSlice,
    friendSlice,
    friendreqSlice,
    messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisPatch = typeof store.dispatch;

export {store};
