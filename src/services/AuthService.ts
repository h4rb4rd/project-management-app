import $api from '../http';

import { AxiosResponse } from 'axios';
import { Endpoints } from './types';
import { SignInResponse, SignUpResponse } from '../models/response/AuthResponse';

export default class AuthService {
  static async signIn(login: string, password: string): Promise<AxiosResponse<SignInResponse>> {
    return $api.post<SignInResponse>(`${Endpoints.SIGN_IN}`, {
      login,
      password,
    });
  }

  static async signUp(
    name: string,
    login: string,
    password: string
  ): Promise<AxiosResponse<SignUpResponse>> {
    return $api.post<SignUpResponse>(`${Endpoints.SIGN_UP}`, {
      name,
      login,
      password,
    });
  }
}
