import { Label } from './types';

export const Priority = {
  NO_PRIORITY: 'no_priority',
  URGENT: 'urgent',
  HIGH: 'high',
  LOW: 'low',
  MEDIUM: 'medium'
};

export const Status = {
  BACKLOG: 'backlog',
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELED: 'canceled',
};

export const DEFAULT_LABLES: Array<Label> = [
  { id: '1', name: 'Bug', color: '#eb5757' },
  { id: '2', name: 'Feature', color: '#bb87fc' },
  { id: '3', name: 'Improvement', color: '#4ea7fc' }
];
