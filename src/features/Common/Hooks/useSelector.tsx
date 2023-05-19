import { TypedUseSelectorHook, useSelector as reduxUseSelector } from "react-redux";

import { RootState } from "../../../app/store";

const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export default useSelector;
