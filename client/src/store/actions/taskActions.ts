import axios from 'axios';
import { Status } from 'shared/constants';
import { Task } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import { CHANGE_STATUS_OF_TASK_SUCCESS, GET_TASKS_FAIL, GET_TASKS_REQUEST, GET_TASKS_SUCCESS } from 'store/contants/taskConstants';
import { AppDispatch, RootState } from 'store/store';
import socket from 'shared/utils/socket';
type TgetAllTasks = (token: string, projectId: string) => void;
type TchangeStatusOfTask = (taskId: string, srcStatus: string, destStatus: string, srcPos: number, destPos: number, projectId: string, token: string) => void;
type TupdateBoardAfterSocketEvent = (task: Task) => void;

export const getAllTasks: TgetAllTasks = (token, projectId) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });
    const { data } = await axios({
      url: `${baseURL}${endpoints.projects}/${projectId}${endpoints.tasks}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tasks = {
      todo: [] as Array<Task>,
      backlog: [] as Array<Task>,
      in_progress: [] as Array<Task>,
      done: [] as Array<Task>,
      cancelled: [] as Array<Task>
    };

    data.tasks.forEach((task: Task) => {
      switch (task.status) {
        case Status.BACKLOG:
          return tasks.backlog.push(task);
        case Status.CANCELED:
          return tasks.cancelled.push(task);
        case Status.DONE:
          return tasks.done.push(task);
        case Status.IN_PROGRESS:
          return tasks.in_progress.push(task);
        case Status.TODO:
          return tasks.todo.push(task);
      }
    });

    dispatch({ type: GET_TASKS_SUCCESS, payload: tasks });

  } catch (e) {
    console.log(e?.response?.data?.message);
    dispatch({ type: GET_TASKS_FAIL, payload: e?.response?.data?.message });
  }
};

export const changeStatusOfTask: TchangeStatusOfTask = (taskId, srcStatus, destStatus, srcPos, destPos, projectId, token) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { taskList, userProfile } = getState();
    let tasks = { ...taskList.tasks };
    let sourceArray: Array<Task> = [...taskList.tasks[srcStatus]];
    let destinationArray: Array<Task> = [...taskList.tasks[destStatus]];
    const task: Task = sourceArray[srcPos];
    task.status = destStatus;
    destinationArray.splice(destPos, 0, task);
    sourceArray.splice(srcPos, 1);

    tasks[srcStatus] = sourceArray;
    tasks[destStatus] = destinationArray;

    // Task with updated Status
    const { data: updatedTask } = await axios({
      url: `${baseURL}${endpoints.projects}/${projectId}${endpoints.tasks}/${taskId}/update`,
      method: "PATCH",
      data: {
        destinationIndex: destPos,
        sourceIndex: srcPos,
        sourceStatus: srcStatus,
        destinationStatus: destStatus
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.emit('board_task_status_change', {
      user: userProfile.user,
      updatedTask,
    });

    dispatch({
      type: CHANGE_STATUS_OF_TASK_SUCCESS,
      payload: tasks
    });
  } catch (e) {
    // dispatch({
    //   type: CHANGE_STATUS_OF_TASK_FAIL,
    //   payload: e.response.data.message
    // });
    console.log(e);
  }
};

export const updateBoardAfterSocketEvent: TupdateBoardAfterSocketEvent = (updatedTask) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { taskList } = getState();
    let tasks = { ...taskList.tasks };
    let allTasks = [...tasks.backlog, ...tasks.todo, ...tasks.in_progress, ...tasks.done, ...tasks.cancelled];

    allTasks = allTasks.map((task: Task) => task._id === updatedTask._id ? updatedTask : task);

    const updatedTasks = {
      todo: [] as Array<Task>,
      backlog: [] as Array<Task>,
      in_progress: [] as Array<Task>,
      done: [] as Array<Task>,
      cancelled: [] as Array<Task>
    };

    allTasks.forEach((task: Task) => {
      switch (task.status) {
        case Status.BACKLOG:
          return updatedTasks.backlog.push(task);
        case Status.CANCELED:
          return updatedTasks.cancelled.push(task);
        case Status.DONE:
          return updatedTasks.done.push(task);
        case Status.IN_PROGRESS:
          return updatedTasks.in_progress.push(task);
        case Status.TODO:
          return updatedTasks.todo.push(task);
      }
    });

    dispatch({
      type: CHANGE_STATUS_OF_TASK_SUCCESS,
      payload: updatedTasks
    });
  } catch (e) {
    // dispatch({
    //   type: CHANGE_STATUS_OF_TASK_FAIL,
    //   payload: e.response.data.message
    // });
    console.log(e);
  }
};
