import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "../reducer/index";
const store = createStore(rootReducers);
export default store;
