import { IColumn } from './IColumn';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
