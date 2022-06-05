import $api from '../http';

import { AxiosResponse } from 'axios';
import { Endpoints } from './types';
import { IUser } from '../models/IUser';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>(`${Endpoints.USERS}`);
  }

  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`${Endpoints.USERS}/${id}`);
  }

  static async deleteUser(id: string) {
    $api.delete(`${Endpoints.USERS}/${id}`);
  }

  static async updateUser(
    id: string,
    name: string,
    login: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`${Endpoints.USERS}/${id}`, { name, login, password });
  }
}
