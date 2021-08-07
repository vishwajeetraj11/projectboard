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
