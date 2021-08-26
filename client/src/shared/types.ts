export type Issue = {
  id: string | undefined;
  priority: string;
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
  owner?: User;
};


// export type User = {
//   id?: string;
//   name?: string;
//   avatar?: string;
// };

export type Label = {
  id: string;
  name: string;
  color: string;
};

// export enum EDropdowmMenus {
//   PRIORITY = 'priority',
//   STATUS = 'status',
//   LABEL = 'label',
//   ASSIGNEE = 'assignee'
// };

export interface Task {
  _id: string,
  title: string,
  priority: string,
  label: string,
  status: string,
  order: number,
  description: string,
  startDate: Date | null | undefined;
  dueDate: Date | null | undefined;
  author: Member,
  assignee: Member,
  updatedAt: Date;
}

export interface User {
  _id: string;
  email: string;
  email_verified: boolean;
  firstName: string;
  lastName: string;
  photo: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Member {
  access: string;
  _id: string;
  project: Project;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface User_Populated_History {
  task: string;
  project: string;
  user: User,
  action:
  'create' |
  'update' |
  'delete' |
  'change' |
  'assign' |
  'add-member' |
  'remove-member';
  extraDetails: any,
  createdAt: Date,
  updatedAt: Date;
}
export interface Populated_History {
  task: Task;
  project: Project;
  user: User,
  action:
  'create' |
  'update' |
  'delete' |
  'change' |
  'assign' |
  'add-member' |
  'remove-member';
  extraDetails: any,
  createdAt: Date,
  updatedAt: Date;
}
