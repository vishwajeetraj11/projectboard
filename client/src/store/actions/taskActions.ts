import axios from 'axios';
import { Status } from 'shared/constants';
import { Member, Task } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import { CHANGE_STATUS_OF_TASK_SUCCESS, GET_TASKS_FAIL, GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASK_DETAIL_FAIL, GET_TASK_DETAIL_REQUEST, GET_TASK_DETAIL_SUCCESS, UPDATE_TASK_MICRO_PROPS_FAIL, UPDATE_TASK_MICRO_PROPS_REQUEST, UPDATE_TASK_MICRO_PROPS_SUCCESS } from 'store/contants/taskConstants';
import { AppDispatch, RootState } from 'store/store';
import socket from 'shared/utils/socket';
type TgetAllTasks = (token: string, projectId: string) => void;
type TgetTaskDetail = (token: string, projectId: string, taskId: string) => void;
type TchangeStatusOfTaskBoard = (taskId: string, srcStatus: string, destStatus: string, srcPos: number, destPos: number, projectId: string, token: string) => void;
type TupdateBoardAfterSocketEvent = (task: any) => void;
type TupdateTaskMicroProperties = (taskId: string, projectId: string, token: string, body: any) => void;

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

export const changeStatusOfTaskBoard: TchangeStatusOfTaskBoard = (taskId, srcStatus, destStatus, srcPos, destPos, projectId, token) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { taskList, currentProject, memberList } = getState();
    const memberIds = memberList.members.map((member: Member) => member._id);
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
      member: currentProject.projectData._id,
      updatedTask,
      memberIds
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

    const sourceStatus = updatedTask.sourceStatus;
    const destinationStatus = updatedTask.destinationStatus;
    const sourceTasks = updatedTask.sourceTasks;
    const destinationTasks = updatedTask.destinationTasks;

    tasks[sourceStatus] = sourceTasks;
    tasks[destinationStatus] = destinationTasks;

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


export const getTaskDetail: TgetTaskDetail = (token, projectId, taskId) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: GET_TASK_DETAIL_REQUEST });
    const { data } = await axios({
      url: `${baseURL}${endpoints.projects}/${projectId}${endpoints.tasks}/${taskId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_TASK_DETAIL_SUCCESS, payload: data.task });

  } catch (e) {
    dispatch({ type: GET_TASK_DETAIL_FAIL, payload: e?.response?.data?.message });
  }
};

export const updateTaskMicroProperties: TupdateTaskMicroProperties = (taskId, projectId, token, body) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({
      type: UPDATE_TASK_MICRO_PROPS_REQUEST,
    });

    const { data: updatedTask } = await axios({
      url: `${baseURL}${endpoints.projects}/${projectId}${endpoints.tasks}/${taskId}`,
      method: "PATCH",
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // If status was not updated.
    if (!updatedTask.sourceStatus) {
      return dispatch({
        type: UPDATE_TASK_MICRO_PROPS_SUCCESS,
        payload: updatedTask
      });
    }

    const { taskList, memberList, currentProject } = getState();
    let tasks = { ...taskList.tasks };
    const memberIds = memberList.members.map((member: Member) => member._id);
    tasks[updatedTask.sourceStatus] = updatedTask.sourceTasks;
    tasks[updatedTask.destinationStatus] = updatedTask.destinationTasks;

    dispatch({
      type: CHANGE_STATUS_OF_TASK_SUCCESS,
      payload: tasks
    });

    socket.emit('board_task_status_change', {
      member: currentProject.projectData._id,
      updatedTask,
      memberIds
    });

    dispatch({
      type: UPDATE_TASK_MICRO_PROPS_SUCCESS,
      payload: updatedTask
    });

  } catch (e) {
    dispatch({
      type: UPDATE_TASK_MICRO_PROPS_FAIL,
      payload: e.response.data.message
    });
    console.log(e);
  }
};

