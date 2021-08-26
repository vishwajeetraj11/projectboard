import { Status, Priority, Labels, DEFAULT_LABLES } from '../constants';

export const getStatusText = (status: string) => {
  switch (status) {
    case Status.BACKLOG:
      return 'Backlog';
    case Status.CANCELED:
      return 'Canceled';
    case Status.DONE:
      return 'Done';
    case Status.IN_PROGRESS:
      return 'In Progress';
    case Status.TODO:
      return 'Todo';
    default:
      return 'No Status';
  }
};

export const getPriorityString = (priority: string) => {
  switch (priority) {
    case Priority.NO_PRIORITY:
      return 'No Priority';
    case Priority.HIGH:
      return 'High';
    case Priority.MEDIUM:
      return 'Medium';
    case Priority.LOW:
      return 'Low';
    case Priority.URGENT:
      return 'Urgent';
    default:
      return 'Priority';
  }
};

export const getLabelObj = (label: string) => {
  switch (label) {
    case Labels.NO_LABEL:
      return DEFAULT_LABLES[3];
    case Labels.IMPROVEMENT:
      return DEFAULT_LABLES[2];
    case Labels.FEATURE:
      return DEFAULT_LABLES[1];
    case Labels.BUG:
      return DEFAULT_LABLES[0];
    default :
      return DEFAULT_LABLES[3];
  }
};
