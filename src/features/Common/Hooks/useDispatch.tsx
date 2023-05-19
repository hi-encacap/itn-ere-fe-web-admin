import { useDispatch as reduxUseDispatch } from "react-redux";

import { AppDispatch } from "../../../app/store";

const useDispatch: () => AppDispatch = reduxUseDispatch;

export default useDispatch;
