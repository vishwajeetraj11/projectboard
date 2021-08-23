
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import { deleteTaskReducer } from 'store/reducers/deleteTask';
import { filtersReducer } from 'store/reducers/filtersReducer';
import { projectHistoryReducer, taskHistoryReducer } from 'store/reducers/historyReducer';
import { memberListReducer } from 'store/reducers/memberReducer';
import { projectReducer } from 'store/reducers/projectReducer';
import { taskDetailReducer } from 'store/reducers/taskDetailReducer';
import { updateTaskReducer } from 'store/reducers/updateTaskReducer';
import { userProfileReducer } from 'store/reducers/userReducer';
import { taskListReducer } from './reducers/taskReducer';


let rootReducer = combineReducers({
  taskList: taskListReducer,
  currentProject: projectReducer,
  memberList: memberListReducer,
  userProfile: userProfileReducer,
  taskDetail: taskDetailReducer,
  filters: filtersReducer,
  projectHistory: projectHistoryReducer,
  taskHistory: taskHistoryReducer,
  updateTask: updateTaskReducer,
  deleteTask: deleteTaskReducer
});
const middlewares = [ReduxThunk];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
