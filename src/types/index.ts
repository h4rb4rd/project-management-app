import { FieldError } from 'react-hook-form';

export type FieldErrorType = FieldError | undefined;

export type CreateFormDataType = {
  title: string;
};

export type SignUpFormDataType = {
  name: string;
  login: string;
  password: string;
  passwordConfirm: string;
};

export type LoginFormDataType = Pick<SignUpFormDataType, 'login' | 'password'>;

export type AccountFormDataType = Omit<SignUpFormDataType, 'passwordConfirm'>;

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
