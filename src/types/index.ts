import { FieldError } from 'react-hook-form';

export type FieldErrorType = FieldError | undefined;

export type LocationType = {
  from: {
    pathname: string;
  };
};

export type TokenDataType = {
  login: string;
  userId: string;
};

export type AxiosErrorDataType = {
  error: string;
  message: string;
  statusCode: number;
};

export type TTitleInput = {
  titleColumn: string;
};

export type TTaskForm = {
  titleTask: string;
  descrTask: string;
};

export enum ETAskModalMode {
  ADD = 'Добавить',
  UPDATE = 'Изменить',
}
