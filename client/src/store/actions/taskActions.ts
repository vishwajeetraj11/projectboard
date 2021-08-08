// import axios from 'axios';
// import { GET_TASKS_FAIL, GET_TASKS_REQUEST, GET_TASKS_SUCCESS } from 'store/contants/taskConstants';
import { AppDispatch } from 'store/store';

export const getAllTasks = () => async (dispatch: AppDispatch) => {
  // try {
  //   const {data} = await axios({
  //     method: 'GET',

  //   })
  // } catch(error) {

  // }
  return [
    {
      title: 'This is the Title',
      description: 'This is the description',
      priority: '',
      status: '',
      assignee: '',
      label: '',
      dueData: new Date(),
      startDate: new Date(),
    },
    {
      title: 'This is the Title',
      description: 'This is the description',
      priority: '',
      status: '',
      assignee: '',
      label: '',
      dueData: new Date(),
      startDate: new Date(),
    }
  ];
};
