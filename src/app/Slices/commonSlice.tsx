import { IREUser } from "@encacap-group/common/dist/re";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

interface CommonSliceType {
  user: IREUser | null;
}

const initialState: CommonSliceType = {
  user: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IREUser>) => {
      if (!state.user) {
        state.user = action.payload;
        return state;
      }

      if (_.isEqual(state.user, action.payload)) {
        return state;
      }

      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      return state;
    },
  },
});

const { actions, reducer: commonReducer } = commonSlice;

export const { setUser, clearUser } = actions;

export default commonReducer;
