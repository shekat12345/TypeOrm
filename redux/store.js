import { createStore } from "redux";
import { countErrors } from "./reducers";

export const store = createStore(countErrors);
export const rxDispatch=(data)=>{store.dispatch(data)}