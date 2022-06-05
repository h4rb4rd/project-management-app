import $api from '../http';

import { AxiosResponse } from 'axios';
import { BoardsResponse } from '../models/response/BoardsResponse';
import { Endpoints } from './types';
import { IBoard } from '../models/IBoard';

export default class BoardsService {
  static async getBoards(): Promise<AxiosResponse<BoardsResponse>> {
    return $api.get<BoardsResponse>(`${Endpoints.BOARDS}`);
  }

  static async getBoard(id: string): Promise<AxiosResponse<IBoard>> {
    return $api.get<IBoard>(`${Endpoints.BOARDS}/${id}`);
  }

  static async createBoard(title: string): Promise<AxiosResponse<IBoard>> {
    return $api.post<IBoard>(`${Endpoints.BOARDS}`, {
      title,
    });
  }

  static async updateBoard(id: string, title: string): Promise<AxiosResponse<IBoard>> {
    return $api.put<IBoard>(`${Endpoints.BOARDS}/${id}`, { title });
  }

  static async deleteBoard(id: string) {
    $api.delete(`${Endpoints.BOARDS}/${id}`);
  }
}
