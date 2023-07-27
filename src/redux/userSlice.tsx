import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {USER, USER_LOGIN, USER_LOGOUT, USER_REG, USER_UPD} from '../utils';
import {UserModel} from '../models';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'user/login',
  async ({user, goToHome, goToFill}: any) => {
    const res = await fetch(`${USER_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (res.status == 200) {
      const data = await res.json();
      if (data.data.name === 'None') {
        goToFill();
      } else {
        await AsyncStorage.setItem('user', JSON.stringify(data.data));
        // lỗi chưa lưu
        goToHome();
      }

      return data;
    } else if (res.status == 401) {
      return {error: 'Tài khoản hoặc mật khẩu không chính xác'};
    } else {
      return {error: 'Lỗi server'};
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async ({user, goToFillProfile}: any) => {
    const res = await fetch(`${USER_REG}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (res.status == 201) {
      const data = await res.json();
      goToFillProfile();
      return data;
    } else {
      return {error: 'Lỗi server'};
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async ({token, goToLogin}: any) => {
    const res = await fetch(`${USER_LOGOUT}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (res.status == 200) {
      await AsyncStorage.removeItem('user');

      goToLogin();
    }
  },
);

export const update = createAsyncThunk(
  'user/update',
  async ({id, user, goToHome}: any) => {
    console.log(id);
    const res = await fetch(`${USER_UPD}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: user,
    });
    if (res.status == 200) {
      const data = await res.json();
      await AsyncStorage.setItem('user', JSON.stringify(data.data));
      goToHome();
      return data;
    } else {
      return {error: 'Lỗi server'};
    }
  },
);

export const get = createAsyncThunk('user/get', async () => {
  const res = await fetch(`${USER}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status == 200) {
    const data = await res.json();

    return data;
  } else {
    return {error: 'Lỗi server'};
  }
});
const initialState = {
  user: {
    _id: '',
    name: '',
    email: '',
    passwd: '',
    phone: '',
    img: '',
    token: '',
  } as UserModel,
  data: [] as UserModel[],
  user_pick: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    img: '',
  } as UserModel,
  loading: false,
  error: '' as string | undefined,
  token: '' as string,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserPick: (state, action) => {
      state.user_pick = action.payload;
    },
    deleteUser: (state, action) => {
      state.data.map((item, index) => {
        if (item._id == action.payload) {
          state.data.splice(index, 1);
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(update.pending, state => {
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(get.pending, state => {
        state.loading = true;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(get.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setUser, setUserPick, deleteUser} = userSlice.actions;
export default userSlice.reducer;
