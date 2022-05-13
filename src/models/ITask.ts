import { IFile } from './IFile';

export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: IFile[];
}
