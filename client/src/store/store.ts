
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
// import taskReducer from './reducers/taskReducer';


let rootReducer = combineReducers({
  // issues: issueReducer,
});
const middlewares = [ReduxThunk];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
