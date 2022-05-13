import { ITask } from './ITask';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}
