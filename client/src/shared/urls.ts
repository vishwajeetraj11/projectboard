const serverUrl = process.env.REACT_APP_SERVER_URL;
export const baseURL = `${serverUrl}/api/v1`;

export const endpoints = {
  tasks: '/tasks',
  profile: '/users/profile',
  projects: '/projects',
  members: '/members',
  users: '/users',
  history: '/history',
  getMyProjects: '/projects?scope=admin',
  getSharedProjects: '/projects?scope=shared',
};
