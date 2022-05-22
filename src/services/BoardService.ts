import { AxiosResponse } from 'axios';

import $api from '../http';
import { IBoardColumn } from '../models/IBoard';

import { ITask } from '../models/ITask';

export default class BoardService {
  static async getColumns(boardId: string): Promise<AxiosResponse<IBoardColumn[]>> {
    return await $api.get<IBoardColumn[]>(`boards/${boardId}/columns`);
  }

  static async addColumn(
    boardId: string,
    titleColumn: string,
    orderColumn: number
  ): Promise<AxiosResponse> {
    return await $api.post(`boards/${boardId}/columns`, {
      title: titleColumn,
      order: orderColumn,
    });
  }

  static async updateColumn(
    boardId: string,
    columnId: string,
    titleColumn: string,
    orderColumn: number
  ): Promise<AxiosResponse> {
    return await $api.put(`boards/${boardId}/columns/${columnId}`, {
      title: titleColumn,
      order: orderColumn,
    });
  }

  static async deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse> {
    return await $api.delete(`boards/${boardId}/columns/${columnId}`);
  }

  static async getTasks(boardId: string, columnId: string): Promise<AxiosResponse<ITask[]>> {
    return await $api.get<ITask[]>(`boards/${boardId}/columns/${columnId}/tasks`);
  }

  static async addTask(
    boardId: string,
    columnId: string,
    title: string,
    order: number,
    description: string,
    userId: string
  ): Promise<AxiosResponse> {
    return await $api.post(`boards/${boardId}/columns/${columnId}/tasks`, {
      title,
      order,
      description,
      userId,
    });
  }

  static async updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string,
    userId: string
  ): Promise<AxiosResponse> {
    return await $api.put(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
  }

  static async transferTask(
    boardId: string,
    columnId: string,
    toColumnId: string,
    taskId: string,
    title: string,
    order: number,
    description: string,
    userId: string
  ): Promise<AxiosResponse | undefined> {
    return await $api.put(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId: toColumnId,
    });
  }

  static async deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse> {
    return await $api.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}
