export type Issue = {
  id: string | undefined;
  priority: string;
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
  owner?: User;
};


export type User = {
  id?: string;
  name?: string;
  avatar?: string;
};

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
  description: string,
  startDate: Date | null | undefined;
  dueDate: Date | null | undefined;
  author: {
    _id: string,
    email: string;
  };
  updatedAt: Date;
}
