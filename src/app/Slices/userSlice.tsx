import { IREUser } from '@encacap-group/types/dist/re';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: IREUser = {} as unknown as IREUser;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IREUser>) => {
      if (!_.isEqual(action.payload, state)) {
        Object.assign(state, action.payload);
      }
    },
    clearUser: (state) => {
      state = {} as unknown as IREUser;
      return state;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

export const { setUser, clearUser } = actions;

export default userReducer;
