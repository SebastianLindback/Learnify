import { createStore } from "redux";
import loginReducer from "../LoginReducer";

export function configureStore() {
    return createStore(loginReducer);
}