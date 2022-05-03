import { FieldError } from 'react-hook-form';

export type FieldErrorType = FieldError | undefined;

export type LoginFormDataType = {
  email: string;
  password: string;
};

export type SignUpFormDataType = {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
};

export type LocationType = {
  from: {
    pathname: string;
  };
};
