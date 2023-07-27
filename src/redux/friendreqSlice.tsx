import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {FriendRequestModel} from '../models';
import {
  REQ_FRIEND_ADD,
  REQ_FRIEND_CHANGESTATUS,
  REQ_FRIEND_DELETE,
  REQ_FRIEND_DELETEID,
  REQ_FRIEND_RECEIVED,
  REQ_FRIEND_SENDED,
} from '../utils';

export const addfriend = createAsyncThunk(
  'reqfriend/add',
  async ({obj, token}: any) => {
    const res = await fetch(REQ_FRIEND_ADD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(obj),
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return {error: 'lỗi'};
    }
  },
);

export const getRedSended = createAsyncThunk(
  'reqfriend/getRedSended',
  async ({id, token}: any) => {
    const res = await fetch(`${REQ_FRIEND_SENDED}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return {error: 'lỗi'};
    }
  },
);

export const getReqReceived = createAsyncThunk(
  'reqfriend/getReqReceived',
  async ({id, token}: any) => {
    const res = await fetch(`${REQ_FRIEND_RECEIVED}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return {error: 'lỗi'};
    }
  },
);

export const deleteReq = createAsyncThunk(
  'reqfriend/delete',
  async ({obj, token}: any) => {
    const res = await fetch(`${REQ_FRIEND_DELETE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(obj),
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return {error: 'Lỗi'};
    }
  },
);

export const changestatus = createAsyncThunk(
  'reqfriend/changestatus',
  async ({id, token, obj}: any) => {
    const res = await fetch(`${REQ_FRIEND_CHANGESTATUS}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(obj),
    });
    if (res.status == 200) {
      const data = await res.json();
      return data;
    } else {
      return {error: 'lỗi'};
    }
  },
);

export const deleteReqId = createAsyncThunk(
  'reqfriend/deleteid',
  async ({obj, token}: any) => {
    const res = await fetch(`${REQ_FRIEND_DELETEID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(obj),
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return {error: 'Lỗi'};
    }
  },
);

const initialState = {
  data: [] as FriendRequestModel[],
  data_res: [] as FriendRequestModel[],
  count: 0 as number,
  loadding: false,
  error: '' as string | undefined,
};

const friendreqSlice = createSlice({
  name: 'friendreqSlice',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRedSended.pending, state => {
        state.loadding = true;
      })
      .addCase(getRedSended.fulfilled, (state, action) => {
        state.loadding = false;
        state.data = action.payload.data;
      })
      .addCase(getRedSended.rejected, (state, action) => {
        state.loadding = false;
        state.error = action.error.message;
      })
      .addCase(addfriend.pending, state => {
        state.loadding = true;
      })
      .addCase(addfriend.fulfilled, (state, action) => {
        state.loadding = false;
        state.data = action.payload.data;
      })
      .addCase(addfriend.rejected, (state, action) => {
        state.loadding = false;
        state.error = action.error.message;
      })
      .addCase(deleteReq.pending, state => {
        state.loadding = true;
      })
      .addCase(deleteReq.fulfilled, (state, action) => {
        state.loadding = false;
        state.data = action.payload.data;
      })
      .addCase(deleteReq.rejected, (state, action) => {
        state.loadding = false;
        state.error = action.error.message;
      })
      .addCase(getReqReceived.pending, state => {
        state.loadding = true;
      })
      .addCase(getReqReceived.fulfilled, (state, action) => {
        state.loadding = false;
        console.log(action.payload.data);
        state.data_res = action.payload.data;
      })
      .addCase(getReqReceived.rejected, (state, action) => {
        state.loadding = false;
        state.error = action.error.message;
      })
      .addCase(deleteReqId.pending, state => {
        state.loadding = true;
      })
      .addCase(deleteReqId.fulfilled, (state, action) => {
        state.loadding = false;
        state.data_res = action.payload.data;
      })
      .addCase(deleteReqId.rejected, (state, action) => {
        state.loadding = false;
        state.error = action.error.message;
      })
      .addCase(changestatus.pending, state => {
        state.loadding = true;
      })
      .addCase(changestatus.fulfilled, (state, action) => {
        state.loadding = false;
        state.data_res = action.payload.data;
      })
      .addCase(changestatus.rejected, (state, action) => {
        state.loadding = false;
        state.error = action.error.message;
      });
  },
});

export const {setCount} = friendreqSlice.actions;
export default friendreqSlice.reducer;
