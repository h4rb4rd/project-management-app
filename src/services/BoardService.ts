import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../http';
import { IColumn } from '../models/IColumns';
import { ITask } from '../models/ITask';

// type TRespColumn = Promise<AxiosResponse<IColumn[]>>;

//, callback: (result:IColumn[]) => void
interface IToken {
  expiry: number;
  value: string;
}

export default class BoardService {
  static async getColumns(boardId: string, callback: (result: IColumn[]) => void) {
    try {
      const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
      const result = await axios.get(`boards/${boardId}/columns`, {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const datalist: IColumn[] = result.data;
      datalist.sort((column1, column2) => column1.order - column2.order);
      callback(datalist);
      console.log('service', datalist);
    } catch (err) {
      console.log(err);
    }
  }

  static async addColumn(boardId: string, titleColumn: string, orderColumn: number) {
    const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  static async updateColumn(
    boardId: string,
    columnId: string,
    titleColumn: string,
    orderColumn: number
  ) {
    try {
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
    } catch (err) {
      console.log([orderColumn, err]);
    }
  }

  static async deleteColumn(boardId: string, columnId: string) {
    try {
      const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
      const result = await axios.delete(`boards/${boardId}/columns/${columnId}`, {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getTasks(boardId: string, columnId: string, callback: (result: ITask[]) => void) {
    try {
      const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
      const result = await axios.get(`boards/${boardId}/columns/${columnId}/tasks`, {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const datalist: ITask[] = result.data;
      datalist.sort((task1, task2) => task1.order - task2.order);
      callback(datalist);
      console.log('service tasks', datalist);
    } catch (err) {
      console.log(err);
    }
  }

  static async addTask(
    boardId: string,
    columnId: string,
    title: string,
    order: number,
    description: string,
    userId: string
  ) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteTask(boardId: string, columnId: string, taskId: string) {
    try {
      const locToken: IToken = JSON.parse(localStorage.getItem('token') || '');
      const result = await axios.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${locToken.value}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
