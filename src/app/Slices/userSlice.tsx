import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { UserDataType } from '@interfaces/Common/userTypes';

const initialState: UserDataType = {} as unknown as UserDataType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      if (!_.isEqual(action.payload, state)) {
        Object.assign(state, action.payload);
      }
    },
    clearUser: (state) => {
      state = {} as unknown as UserDataType;
      return state;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

export const { setUser, clearUser } = actions;

export default userReducer;
