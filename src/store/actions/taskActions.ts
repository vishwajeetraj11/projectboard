import axios from 'axios';
import { showError, showInfo, showWarning } from 'components/Notification';
import { Status } from 'shared/constants';
import { Member, Task } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import socket from 'shared/utils/socket';
import { GET_PROJECT_HISTORY_SUCCESS } from 'store/contants/historyConstants';
import { CHANGE_STATUS_OF_TASK_SUCCESS, DELETE_TASK_CLEAR, DELETE_TASK_FAIL, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_TASKS_FAIL, GET_TASKS_REQUEST, GET_TASKS_SUCCESS, GET_TASK_DETAIL_FAIL, GET_TASK_DETAIL_REQUEST, GET_TASK_DETAIL_SUCCESS, UPDATE_TASK_MICRO_PROPS_FAIL, UPDATE_TASK_MICRO_PROPS_REQUEST, UPDATE_TASK_MICRO_PROPS_SUCCESS } from 'store/contants/taskConstants';
import { AppDispatch, RootState } from 'store/store';

type TgetAllTasks = (token: string, projectId: string) => void;
type TgetTaskDetail = (token: string, projectId: string, taskId: string) => void;
type TchangeStatusOfTaskBoard = (taskId: string, srcStatus: string, destStatus: string, srcPos: number, destPos: number, projectId: string, token: string) => void;
type TupdateBoardAfterSocketEvent = (task: any) => void;
type TupdateTaskMicroProperties = (taskId: string, projectId: string, token: string, body: any) => void;
type TupdateTaskAfterDeleteSocketEvent = (taskId: string) => void;
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

    showWarning("Please wait!", 'Updating Task...');
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

    showInfo("", 'Board Updated Successfully');

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
    showInfo(`Task with title ${updatedTask?.task?.title} has been updated.`, 'Task Updated.');

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
      // dispatch({
      //   type: GET_TASK_DETAIL_SUCCESS,
      //   payload: updatedTask.updatedTask
      // });
      dispatch({
        type: UPDATE_TASK_MICRO_PROPS_SUCCESS,
        payload: updatedTask.updatedTask
      });
      return;
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
      type: GET_TASK_DETAIL_SUCCESS,
      payload: updatedTask.updatedTask
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

export const updateTaskAfterDeleteSocketEvent: TupdateTaskAfterDeleteSocketEvent = (taskId) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { taskList } = getState();
  let tasks = [...taskList.tasks.backlog, ...taskList.tasks.todo, ...taskList.tasks.in_progress, ...taskList.tasks.done, ...taskList.tasks.cancelled];
  let tasksByStatusObj = { ...taskList.tasks };

  const taskToDelete: Task = tasks.find((task: Task) => task._id === taskId);
  const sourceTasks: Array<Task> = tasksByStatusObj[taskToDelete.status];

  let updatedSourceTasks: Array<Task> = sourceTasks.filter((task: Task) => task._id !== taskId);

  updatedSourceTasks = updatedSourceTasks.map((task: Task) => {
    if (task.order > taskToDelete.order) {
      task.order -= 1;
    }
    return task;
  });

  tasksByStatusObj[taskToDelete.status] = updatedSourceTasks;

  dispatch({ type: GET_TASKS_SUCCESS, payload: tasksByStatusObj });
  showInfo(`Task with title: ${taskToDelete?.title} was deleted. For more information, please check history.`, "Task Deleted");
};

export const deleteTask = (taskId: string, projectId: string, token: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({ type: DELETE_TASK_REQUEST });
    const { currentProject, taskList, memberList } = getState();
    let tasks = [...taskList.tasks.backlog, ...taskList.tasks.todo, ...taskList.tasks.in_progress, ...taskList.tasks.done, ...taskList.tasks.cancelled];
    let tasksByStatusObj = { ...taskList.tasks };
    const taskToDelete: Task = tasks.find((task: Task) => task._id === taskId);
    const sourceTasks: Array<Task> = tasksByStatusObj[taskToDelete.status];
    let updatedSourceTasks: Array<Task> = sourceTasks.filter((task: Task) => task._id !== taskId);
    updatedSourceTasks = updatedSourceTasks.map((task: Task) => {
      if (task.order > taskToDelete.order) {
        task.order -= 1;
      }
      return task;
    });
    tasksByStatusObj[taskToDelete.status] = updatedSourceTasks;

    const memberIds = memberList.members.map((member: Member) => member._id);

    await axios({
      url: `${baseURL}${endpoints.projects}/${projectId}${endpoints.tasks}/${taskId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (taskId) {
      socket.emit('delete_task_update', {
        member: currentProject.projectData._id,
        taskId,
        memberIds
      });
    }

    dispatch({ type: GET_TASKS_SUCCESS, payload: tasksByStatusObj });
    dispatch({ type: DELETE_TASK_SUCCESS });
    showInfo('', 'Task Deleted Successfully');
  } catch (e) {
    showError(e?.response?.data?.message, 'Error Deleting Task.');
    dispatch({ type: DELETE_TASK_FAIL, payload: e?.response?.data?.message });
    dispatch({ type: DELETE_TASK_CLEAR });
  }

};

export const updateTasksAfterSocketEvent = (newTaskData: { history: History, task: Task, success: string; }) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { taskList, projectHistory } = getState();
  const { task, history } = newTaskData;
  let tasksByStatusObj = { ...taskList.tasks };
  const sourceTasks: Array<Task> = tasksByStatusObj[task.status];
  sourceTasks.push(task);
  tasksByStatusObj[task.status] = sourceTasks;

  dispatch({ type: GET_TASKS_SUCCESS, payload: tasksByStatusObj });
  showInfo(`New Task with title: ${task?.title} was created. For more information, please check history.`, "A new Task was created.");

  const allProjectHistory = [...projectHistory.history];
  allProjectHistory.unshift(history);

  dispatch({ type: GET_PROJECT_HISTORY_SUCCESS, payload: allProjectHistory });
};
