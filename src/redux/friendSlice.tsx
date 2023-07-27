import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {FriendModel} from '../models';
import {FRIEND_ADD, FRIEND_GET} from '../utils';
import {Loading} from '../components';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const getFriend = createAsyncThunk('friend/get', async (id: any) => {
  const res = await fetch(`${FRIEND_GET}/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    console.log('-------data getFriend-----------');
    console.log(data);
    return data;
  } else {
    return {msg: 'Lỗi'};
  }
});

export const addFriend = createAsyncThunk('friend/add', async ({obj}: any) => {
  const res = await fetch(FRIEND_ADD, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  } else {
    return {error: 'Lỗi'};
  }
});

const initialState = {
  data: [] as FriendModel[],
  error: '' as string | undefined,
  loading: false,
};

const friendSlice = createSlice({
  name: 'friendSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFriend.pending, state => {
        state.loading = true;
      })
      .addCase(getFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFriend.pending, state => {
        state.loading = true;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default friendSlice.reducer;
