import { StackNavigationProp } from '@react-navigation/stack';

// Views
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Projects: undefined;
  NewProject: undefined;
  ProjectDetails: Project;
};

// Navigation
export type NavigationProp = StackNavigationProp<RootStackParamList>;

// Projects
export type Project = {
  id: string;
  name: string;
};

export type GetProjectsData = {
  getProjects: Project[];
};

// Tasks
export type Task = {
  id: string;
  name: string;
  project: Project;
  status: boolean;
};

export type GetTasksData = {
  getTasks: Task[];
};
