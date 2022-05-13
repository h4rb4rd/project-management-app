import $api from '../http';

import { AxiosResponse } from 'axios';
import { BoardsResponse } from '../models/response/BoardsResponse';
import { IBoard } from '../models/IBoard';

export default class BoardsService {
  static async getBoards(): Promise<AxiosResponse<BoardsResponse>> {
    return $api.get<BoardsResponse>('/boards');
  }

  static async getBoard(id: string): Promise<AxiosResponse<IBoard>> {
    return $api.get<IBoard>(`/boards/${id}`);
  }

  static async createBoard(title: string): Promise<AxiosResponse<IBoard>> {
    return $api.post<IBoard>('/boards', {
      title,
    });
  }

  static async updateBoard(id: string, title: string): Promise<AxiosResponse<IBoard>> {
    return $api.put<IBoard>(`/boards/${id}`, { title });
  }

  static async deleteBoard(id: string) {
    $api.delete(`/boards/${id}`);
  }
}
