import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../http';
import { IBoardColumn } from '../models/IBoard';
import { IColumn } from '../models/IColumns';
import { ITask } from '../models/ITask';

interface IToken {
  expiry: number;
  value: string;
}

export default class BoardService {
  static async getColumns(boardId: string): Promise<AxiosResponse<IBoardColumn[]>> {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.get(`boards/${boardId}/columns`, {
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${locToken.value}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return result;
  }

  static async addColumn(
    boardId: string,
    titleColumn: string,
    orderColumn: number
  ): Promise<AxiosResponse> {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.post(
      `boards/${boardId}/columns`,
      {
        title: titleColumn,
        order: orderColumn,
      },
      {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return result;
  }

  static async updateColumn(
    boardId: string,
    columnId: string,
    titleColumn: string,
    orderColumn: number
  ): Promise<AxiosResponse> {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.put(
      `boards/${boardId}/columns/${columnId}`,
      {
        title: titleColumn,
        order: orderColumn,
      },
      {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return result;
  }

  static async deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse> {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.delete(`boards/${boardId}/columns/${columnId}`, {
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${locToken.value}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return result;
  }

  static async getTasks(boardId: string, columnId: string): Promise<AxiosResponse<ITask[]>> {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.get(`boards/${boardId}/columns/${columnId}/tasks`, {
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${locToken.value}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return result;
  }

  static async addTask(
    boardId: string,
    columnId: string,
    title: string,
    order: number,
    description: string,
    userId: string
  ): Promise<AxiosResponse> {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.post(
      `boards/${boardId}/columns/${columnId}/tasks`,
      {
        title,
        order,
        description,
        userId,
      },
      {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return result;
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
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.put(
      `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
      },
      {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return result;
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
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.put(
      `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId: toColumnId,
      },
      {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return result;
  }

  static async deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse> {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    const result = await axios.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${locToken.value}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return result;
  }
}
