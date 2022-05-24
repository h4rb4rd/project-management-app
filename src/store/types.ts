import { IBoard, IBoardColumn } from '../models/IBoard';

export interface IInitStateBoard {
  board: IBoard | null;
  columnList: IBoardColumn[];
  isLoading: boolean;
  error: string;
}

export interface IMoveColumnItem {
  dragId: string;
  hoverId: string;
}

export interface IMoveTaskItem {
  columnId: string;
  dragId: string;
  hoverId: string;
}

export interface ITransferTaskItem {
  fromColumnId: string;
  toColumnId: string;
  taskId: string;
  newOrder: number;
}

export interface IDeleteTaskItem {
  columnId: string;
  taskId: string;
}
