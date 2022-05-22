import { IColumn } from './IColumn';
import { ITask } from './ITask';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IBoardColumn extends IColumn {
  tasks: ITask[];
}
