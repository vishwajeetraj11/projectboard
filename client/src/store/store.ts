
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import { projectReducer } from 'store/reducers/projectReducer';
import { taskDeleteReducer, taskListReducer } from './reducers/taskReducer';


let rootReducer = combineReducers({
  taskList: taskListReducer,
  currentProject: projectReducer,
  taskDelete: taskDeleteReducer
});
const middlewares = [ReduxThunk];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
