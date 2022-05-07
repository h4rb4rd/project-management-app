import $api from '../http';

import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>(`/users`);
  }

  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/users/${id}`);
  }

  static async deleteUser(id: string) {
    $api.delete(`/users/${id}`);
  }

  static async updateUser(
    id: string,
    name: string,
    login: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/users/${id}`, { name, login, password });
  }
}
