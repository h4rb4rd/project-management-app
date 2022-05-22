import { AxiosResponse } from 'axios';

import $api from '../http';
import { Endpoints } from './types';
import { IBoardColumn } from '../models/IBoard';
import { ITask } from '../models/ITask';

export default class BoardService {
  static async getColumns(boardId: string): Promise<AxiosResponse<IBoardColumn[]>> {
    return await $api.get<IBoardColumn[]>(`${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}`);
  }

  static async addColumn(
    boardId: string,
    titleColumn: string,
    orderColumn: number
  ): Promise<AxiosResponse> {
    return await $api.post(`${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}`, {
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
    return await $api.put(`${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}/${columnId}`, {
      title: titleColumn,
      order: orderColumn,
    });
  }

  static async deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse> {
    return await $api.delete(`${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}/${columnId}`);
  }

  static async getTasks(boardId: string, columnId: string): Promise<AxiosResponse<ITask[]>> {
    return await $api.get<ITask[]>(
      `${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}/${columnId}/${Endpoints.TASKS}`
    );
  }

  static async addTask(
    boardId: string,
    columnId: string,
    title: string,
    order: number,
    description: string,
    userId: string
  ): Promise<AxiosResponse> {
    return await $api.post(
      `${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}/${columnId}/${Endpoints.TASKS}`,
      {
        title,
        order,
        description,
        userId,
      }
    );
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
    return await $api.put(
      `${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}/${columnId}/${Endpoints.TASKS}/${taskId}`,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
      }
    );
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
    return await $api.put(
      `${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}/${columnId}/${Endpoints.TASKS}/${taskId}`,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId: toColumnId,
      }
    );
  }

  static async deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse> {
    return await $api.delete(
      `${Endpoints.BOARDS}/${boardId}/${Endpoints.COLUMNS}/${columnId}/${Endpoints.TASKS}/${taskId}`
    );
  }
}
