import axios, { AxiosResponse } from 'axios';

import { API_URL } from '../http';
import { IColumn } from '../models/IColumns';

// type TRespColumn = Promise<AxiosResponse<IColumn[]>>;

//, callback: (result:IColumn[]) => void

export default class BoardService {
  static async getColumns(boardId: string, callback: (result: IColumn[]) => void) {
    try {
      const result = await axios.get(`boards/${boardId}/columns`, {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      callback(result.data);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  static async addColumn(boardId: string, titleColumn: string, orderColumn: number) {
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async updateColumn(boardId: string, titleColumn: string, orderColumn: number) {
    try {
      const result = await axios.put(
        `boards/${boardId}/columns`,
        {
          title: titleColumn,
          order: orderColumn,
        },
        {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}
