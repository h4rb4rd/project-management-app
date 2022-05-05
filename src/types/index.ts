import { FieldError } from 'react-hook-form';

export type FieldErrorType = FieldError | undefined;

export type LoginFormDataType = {
  login: string;
  password: string;
};

export type SignUpFormDataType = {
  name: string;
  login: string;
  password: string;
};

export type LocationType = {
  from: {
    pathname: string;
  };
};
